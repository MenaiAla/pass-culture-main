- [x] `youngStatus` -> `status`
- [x] `subscription_status` -> `/native/v1/me`
- [x] open api

- [ ] récupérer les issues pas à partir des subscriptions messages
    - [x] identity check
        - [x] ubble
        - [x] dms
        - [x] educonnect
    - [ ] phone
        - [x] INVALID_PHONE_COUNTRY_CODE : issue
        - [x] PHONE_ALREADY_EXISTS : issue
        - [x] PHONE_UNVALIDATED_BY_PEER : issue
        - [x] PHONE_UNVALIDATION_FOR_PEER : ok
        - [x] PHONE_VALIDATION_ATTEMPTS_LIMIT_REACHED : issue / appeler le support
        - [x] SMS_SENDING_LIMIT_REACHED : has to complete
        - [x] si on a plusieurs phone fraud checks, dont le premier invalid, mais le dernier ok, alors c'est ok
        - [ ] Si on a un fraud check KO (phone already exists) et ensuite on a un autre check pour lequel on atteind la limite de SMS : has to complete 
    - [ ] has_subscription_issues > has_subscription_pending

- [ ] has_to_complete_subscription > has_subscription_pending
- [ ] has_to_complete_subscription > has_subscription_issues

- [ ] has_subscription_pending > has_subscription_issues temporairement tant que has_subscription_issues n'est pas exhautif
- [ ] calculer le nombre d'user qui sont dans le cas `should never happen`
- [ ] BLACKLISTED_PHONE_NUMBER : non eliglibe ?


[MobTime](https://mobtime.onrender.com/mob/pass-culture)
