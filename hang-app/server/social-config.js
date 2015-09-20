ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1001911333184728',
    secret: 'c5fea71335dd5e3c726f9c849302ff66'
});

Hangouts = new Mongo.Collection("hangouts");