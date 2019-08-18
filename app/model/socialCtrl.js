app.controller('Socialshare', function testController(Socialshare) {

    Socialshare.share({
      'provider': 'whatsapp',
      'attrs': {
        'socialshareUrl': 'http://720kb.net'
      }
    });


});