# Send-zalo-msg-module-new
## init obj msg
const msg = new Msg({
  decryptKey: cookies.DECRYPT_KEY_VALUE,
  sessionKey: cookies.SESSION_KEY,
  zpwVersion: cookies.ZPW_VERSION,
  zpwType: cookies.ZPW_TYPE,
});



const paramText = {
    clientId: Date.now(),
    grid: convId,
    message: text,
    visibility: 0,
  };

msg.sendText(paramText);



const paramPoll = {
    allow_add_new_option: allowAddOption,
    allow_multi_choices: allowMutiChoices,
    expired_time: expiredTime,
    group_id: convId,
    is_anonymous: false,
    options,
    poll_type: 0,
    question,
    src: 1,
  };

msg.createPoll(paramPoll);

