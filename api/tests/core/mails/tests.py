import dataclasses
from unittest.mock import patch

import pytest

from pcapi.core.mails import models
from pcapi.core.testing import override_settings
from pcapi.core.users import factories as users_factories
from pcapi.core.users import models as users_models
from pcapi.tasks.serialization import sendinblue_tasks
from pcapi.utils.module_loading import import_string


@pytest.mark.usefixtures("db_session")
class SendinblueBackendTest:
    recipients = ["lucy.ellingson@example.com", "avery.kelly@example.com"]
    bcc_recipients = ["catherine.clark@example.com", "tate.walker@example.com"]
    mock_template = models.Template(
        id_prod=1, id_not_prod=10, tags=["this_is_such_a_great_tag", "it_would_be_a_pity_if_anything_happened_to_it"]
    )
    mock_reply_to = models.EmailInfo(email="reply_to@example.com", name="Tom S.")
    params = {"Name": "Lucy", "City": "Kennet", "OtherCharacteristics": "Awsomeness"}
    data = models.TransactionalEmailData(template=mock_template, params=params, reply_to=mock_reply_to)

    expected_sent_data = sendinblue_tasks.SendTransactionalEmailRequest(
        recipients=recipients,
        bcc_recipients=bcc_recipients,
        params=params,
        template_id=data.template.id,
        tags=data.template.tags,
        sender=dataclasses.asdict(models.TransactionalSender.SUPPORT.value),
        reply_to={"email": "reply_to@example.com", "name": "Tom S."},
    )

    def _get_backend(self):
        return import_string("pcapi.core.mails.backends.sendinblue.SendinblueBackend")

    @override_settings(
        WHITELISTED_EMAIL_RECIPIENTS=[
            "lucy.ellingson@example.com",
            "avery.kelly@example.com",
            "catherine.clark@example.com",
            "tate.walker@example.com",
        ]
    )
    @patch("pcapi.core.mails.backends.sendinblue.send_transactional_email_secondary_task.delay")
    def test_send_mail(self, mock_send_transactional_email_secondary_task):
        backend = self._get_backend()
        result = backend().send_mail(recipients=self.recipients, bcc_recipients=self.bcc_recipients, data=self.data)

        assert mock_send_transactional_email_secondary_task.call_count == 1
        task_param = mock_send_transactional_email_secondary_task.call_args[0][0]

        assert set(task_param.recipients) == set(self.expected_sent_data.recipients)
        assert set(task_param.bcc_recipients) == set(self.expected_sent_data.bcc_recipients)
        assert task_param.params == self.expected_sent_data.params
        assert task_param.template_id == self.expected_sent_data.template_id
        assert task_param.tags == self.expected_sent_data.tags
        assert task_param.sender == self.expected_sent_data.sender
        assert task_param.reply_to == self.expected_sent_data.reply_to
        assert result.successful

    @override_settings(WHITELISTED_EMAIL_RECIPIENTS=["lucy.ellingson@example.com", "avery.kelly@example.com"])
    @patch("pcapi.core.mails.backends.sendinblue.send_transactional_email_secondary_task.delay")
    def test_send_mail_with_no_reply_equal_overrided_by_sender(self, mock_send_transactional_email_secondary_task):

        self.data = models.TransactionalEmailData(template=self.mock_template, params=self.params, reply_to=None)

        expected_sent_data_no_reply = sendinblue_tasks.SendTransactionalEmailRequest(
            recipients=self.recipients,
            params=SendinblueBackendTest.params,
            template_id=SendinblueBackendTest.data.template.id,
            tags=SendinblueBackendTest.data.template.tags,
            sender=dataclasses.asdict(models.TransactionalSender.SUPPORT.value),
            reply_to=dataclasses.asdict(models.TransactionalSender.SUPPORT.value),
        )

        backend = self._get_backend()
        result = backend().send_mail(recipients=self.recipients, data=self.data)

        assert mock_send_transactional_email_secondary_task.call_count == 1
        task_param = mock_send_transactional_email_secondary_task.call_args[0][0]
        assert set(task_param.recipients) == set(expected_sent_data_no_reply.recipients)
        assert task_param.params == expected_sent_data_no_reply.params
        assert task_param.template_id == expected_sent_data_no_reply.template_id
        assert task_param.tags == expected_sent_data_no_reply.tags
        assert task_param.sender == expected_sent_data_no_reply.sender
        assert task_param.reply_to == expected_sent_data_no_reply.reply_to
        assert result.successful


@pytest.mark.usefixtures("db_session")
class ToDevSendinblueBackendTest(SendinblueBackendTest):

    expected_sent_data_to_dev = sendinblue_tasks.SendTransactionalEmailRequest(
        recipients=["dev@example.com"],
        bcc_recipients=["test@example.com"],
        params=SendinblueBackendTest.params,
        template_id=SendinblueBackendTest.data.template.id,
        tags=SendinblueBackendTest.data.template.tags,
        sender=dataclasses.asdict(models.TransactionalSender.SUPPORT.value),
        reply_to={"email": "reply_to@example.com", "name": "Tom S."},
    )

    def _get_backend(self):
        return import_string("pcapi.core.mails.backends.sendinblue.ToDevSendinblueBackend")

    @override_settings(WHITELISTED_EMAIL_RECIPIENTS=["test@example.com"])
    @patch("pcapi.core.mails.backends.sendinblue.send_transactional_email_secondary_task.delay")
    def test_send_mail_to_dev(self, mock_send_transactional_email_secondary_task):
        backend = self._get_backend()
        result = backend().send_mail(recipients=self.recipients, bcc_recipients=["test@example.com"], data=self.data)

        assert mock_send_transactional_email_secondary_task.call_count == 1
        task_param = mock_send_transactional_email_secondary_task.call_args[0][0]
        assert set(task_param.recipients) == set(self.expected_sent_data_to_dev.recipients)
        assert set(task_param.bcc_recipients) == set(self.expected_sent_data_to_dev.bcc_recipients)
        assert task_param.params == self.expected_sent_data_to_dev.params
        assert task_param.template_id == self.expected_sent_data_to_dev.template_id
        assert task_param.tags == self.expected_sent_data_to_dev.tags
        assert task_param.sender == self.expected_sent_data_to_dev.sender
        assert task_param.reply_to == self.expected_sent_data_to_dev.reply_to
        assert result.successful

    @patch("pcapi.core.mails.backends.sendinblue.send_transactional_email_secondary_task.delay")
    def test_send_mail_test_user(self, mock_send_transactional_email_secondary_task):
        users_factories.UserFactory(email=self.recipients[0], roles=[users_models.UserRole.TEST])

        backend = self._get_backend()
        result = backend().send_mail(recipients=self.recipients, data=self.data)

        assert mock_send_transactional_email_secondary_task.call_count == 1
        task_param = mock_send_transactional_email_secondary_task.call_args[0][0]
        assert list(task_param.recipients) == list(self.recipients[0:1])
        assert result.successful

    @pytest.mark.parametrize("recipient", ["avery.kelly@example.com", "Test-ywh-0123456789012345@yeswehack.ninja"])
    @override_settings(
        WHITELISTED_EMAIL_RECIPIENTS=["whitelisted@example.com", "avery.kelly@example.com"], IS_STAGING=True
    )
    @patch("pcapi.core.mails.backends.sendinblue.send_transactional_email_secondary_task.delay")
    def test_send_mail_whitelisted(self, mock_send_transactional_email_secondary_task, recipient):
        users_factories.UserFactory(email=recipient, roles=[users_models.UserRole.TEST])

        backend = self._get_backend()
        result = backend().send_mail(recipients=[recipient, "lucy.ellingson@example.com"], data=self.data)

        assert mock_send_transactional_email_secondary_task.call_count == 1
        task_param = mock_send_transactional_email_secondary_task.call_args[0][0]
        assert list(task_param.recipients) == [recipient]
        assert result.successful
