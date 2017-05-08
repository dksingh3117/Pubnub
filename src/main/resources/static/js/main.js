var PUB_KEY = $("#pub_key").val();
var SUB_KEY = $("#sub_key").val();
var SECRET_KEY = $("#secret_key").val();
var UUID = $("#uuid").val();

function stateInit() {
    stateEnable = $("#stateEnable").prop('checked');
    state = stateEnable && $("#state").val().length > 0 ? JSON.parse($("#state").val()) : false;
}
stateInit();
$("#state, #stateEnable").bind("change", function () {
    stateInit();
});

function channelInit() {
    channelEnable = $("#channelEnable").prop('checked');
    channel = channelEnable && $("#channel").val().length > 0 ? $("#channel").val() : false;
}

channelInit();
$("#channel, #channelEnable").bind("change", function () {
    channelInit();
});

function messageInit() {
	
    message = $("#message").val().length > 0 ? $("#message").val() : null;
}

messageInit();
$("#message").bind("change", function () {
    messageInit();
});

function originInit() {
    origin = $("#origin").val().length > 0 ? $("#origin").val() : null;
}
originInit();
$("#origin").bind("change", function () {
    originInit();
});

pubnub = PUBNUB.init({
    "subscribe_key": SUB_KEY,
    "publish_key": PUB_KEY,
    "secret_key": SECRET_KEY,
    "uuid": UUID,
    "origin": origin
});


function pnTime() {
    pubnub.time(
        function (time) {
            displayCallback(time);
        }
    );
}

function pnPublish() {
    if (channel) {
        pubnub.publish({
            channel: channel,
            message: $("#message").val(),
            callback: displayCallback,
            error: displayCallback
        });
    }
}

function displayCallback(m, e, c) {
    // Use first and last args

    if (c && m) {
        console.log(JSON.stringify(c + ": " + m));
        $("#output").html(c + ":" + JSON.stringify(m, null, 4) + "\n\n" + $("#output").html());

        // Only one argument
    } else if (m) {
        console.log(JSON.stringify(m));
        $("#output").html(JSON.stringify(m, null, 4) + "\n\n" + $("#output").html());

    }
}

function getDefaultCBConfig(){
    return {
        callback: displayCallback,
        error: displayCallback
    };
}

function pnSubscribe() {
    console.log('pnSubscribe');

    var config = getDefaultCBConfig();
    config["noheresync"] = true;

    if (channel) {
        config["channel"] = channel;
    } else if (channelGroup) {
        config["channel_group"] = channelGroup;
    }

    pubnub.subscribe(config);

}

function pnUnsubscribe() {
    if (channel) {
        pubnub.unsubscribe({
            channel: channel,
            callback: displayCallback,
            error: displayCallback
        });
    } else if (channelGroup) {
        pubnub.unsubscribe({
            channel_group: channelGroup,
            callback: displayCallback,
            error: displayCallback
        });
    }
}



function pnUnsubscribe() {
    if (channel) {
        pubnub.unsubscribe({
            channel: channel,
            callback: displayCallback,
            error: displayCallback
        });
    } else if (channelGroup) {
        pubnub.unsubscribe({
            channel_group: channelGroup,
            callback: displayCallback,
            error: displayCallback
        });
    }
}


function pnSetState() {
    if (channel) {
        pubnub.state({
            channel: channel,
            state: state,
            callback: displayCallback,
            error: displayCallback
        });

    } else if (channelGroup) {
        pubnub.state({
            channel_group: channelGroup,
            state: state,
            callback: displayCallback,
            error: displayCallback
        });
    }
}

function pnGetState() {
    if (channel) {
        pubnub.state({
            channel: channel,
            callback: displayCallback,
            error: displayCallback
        });
    } else if (channelGroup) {
        pubnub.state({
            channel_group: channelGroup,
            callback: displayCallback,
            error: displayCallback
        });
    }
}







$("#getState").click(function () {
    pnGetState();
});

$("#setState").click(function () {
    pnSetState();
});

$("#addChannel").click(function () {
    pnAddChannel();
});


$("#publish").click(function () {
    pnPublish();
});

$("#whereNow").click(function () {
    pnWhereNow();
});

$("#hereNow").click(function () {
    pnHereNow();
});


$("#history").click(function () {
    pnHistory();
});

$("#removeChannel").click(function () {
    pnRemoveChannel();
});


$("#time").click(function () {
    pnTime();
});

$("#subscribe").click(function () {
    pnSubscribe();
});

$("#unsubscribe").click(function () {
    pnUnsubscribe();
});


$(".clear").click(function () {
    $("#output").html("");
});