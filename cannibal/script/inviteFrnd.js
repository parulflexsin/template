(function(global){
    var inviteViewModel,
        app = global.app = global.app || {};
    
    inviteViewModel = kendo.data.ObservableObject.extend({
        
        show:function()
        {
            
        },
        
        sendSMSViaComposer:function()
        {
            if (!this.checkSimulator()) {
                var options = {
                  android: {
                    intent: 'INTENT'
                  }
                };
                window.sms.send('', 'Hi! This is a Testing message!', options, this.onSuccess, this.onError);
            }
        },
        
        onSuccess:function(msg)
        {
            console.log(msg);
        },
        
        onError:function(msg)
        {
            console.log(msg);
        },
        
        checkSimulator: function() {
            if (window.navigator.simulator === true) {
                alert('This plugin is not available in the simulator.');
                return true;
            } else if (window.sms === undefined) {
                alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
                return true;
            } else {
                return false;
            }
        },
        
        sendEmailViaComposer:function()
        {
            if (!this.checkSimulator()) {
                cordova.plugins.email.open({
                    to:          ['person1@domain.com'],
                    cc:          ['person2@domain.com'],
                    bcc:         ['person3@domain.com', 'person4@domain.com'],
                    attachments: ['file://styles/images/logo.png', 'file://styles/images/logo2x.png'],
                    subject:     'Invite My Friend',
                    body:        '<h2>Hello!</h2>This is a nice <strong>HTML</strong> email with two attachments.',
                    isHtml:      true
                }, this.callback)
            }
        },
        
        callback: function(msg) {
            navigator.notification.alert(JSON.stringify(msg), null, 'EmailComposer callback', 'Close');
        },
        
        
        composeEmail: function () {
            if (!this.checkSimulator()) {
                cordova.plugins.email.open({
                    to:          ['person1@domain.com'],
                    cc:          ['person2@domain.com'],
                    bcc:         ['person3@domain.com', 'person4@domain.com'],
                    attachments: ['file://styles/images/logo.png', 'file://styles/images/logo2x.png'],
                    subject:     'EmailComposer plugin test',
                    body:        '<h2>Hello!</h2>This is a nice <strong>HTML</strong> email with two attachments.',
                    isHtml:      true
                }, this.callback)
            }
        },
        
        findContactNumber:function()
        {
            alert("enter");
            
            var options = new ContactFindOptions();
            console.log(options);
            options.filter = "";
            options.multiple = true;
            var filter = ["displayName", "addresses"];
            navigator.contacts.find(filter, this.onSuccess1, this.onError1, options);
        },
        
        onSuccess1:function(contacts)
        {
            for (var i = 0; i < contacts.length; i++) 
                {
                    for (var j = 0; j < contacts[i].addresses.length; j++) 
                    {
                        alert("Pref: "         + contacts[i].addresses[j].pref          + "\n" +
                        "Type: "           + contacts[i].addresses[j].type          + "\n" +
                        "Formatted: "      + contacts[i].addresses[j].formatted     + "\n" +
                        "Street Address: " + contacts[i].addresses[j].streetAddress + "\n" +
                        "Locality: "       + contacts[i].addresses[j].locality      + "\n" +
                        "Region: "         + contacts[i].addresses[j].region        + "\n" +
                        "Postal Code: "    + contacts[i].addresses[j].postalCode    + "\n" +
                        "Country: "        + contacts[i].addresses[j].country);
                    }
                }
        },
        
        onError1:function(contactError)
        {
            alert('onError!');
        },
    });
    app.inviteService = {
        viewModel:new inviteViewModel()
    };
})(window);