import json

from google.cloud import tasks_v2


GCP_PROJECT = "passculture-metier-ehp"
GCP_LOCATION = "europe-west1"


def get_client():
    if not hasattr(get_client, "client"):
        get_client.client = tasks_v2.CloudTasksClient()

    return get_client.client


def enqueue_task(queue, url, payload):

    client = get_client()
    parent = client.queue_path(GCP_PROJECT, GCP_LOCATION, queue)

    body = json.dumps(payload).encode()

    task_request = {
        "http_request": {
            "http_method": tasks_v2.HttpMethod.POST,
            "url": url,
            "headers": {"Content-type": "application/json"},
            "body": body,
        },
    }

    response = client.create_task(request={"parent": parent, "task": task_request})

    task_id = response.name.split("/")[-1]
    return task_id
