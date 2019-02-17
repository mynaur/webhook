
const functions = require('firebase-functions');
const {dialogflow} = require('actions-on-google');
const {WebhookClient} = require('dialogflow-fulfillment');


const WELCOME_INTENT = 'Default Welcome Intent';
const FALLBACK_INTENT = 'Default Fallback Intent';
const SEARCH_PRODUCT = 'search product';
const WRONG_PRODUCT = 'wrong products';


/**  DEFINING WEBHOOK **/
app.post('/webhook', (req, res) => {

    console.log('/Webhook call : received post request');
    const agent = new WebhookClient({
        request: req,
        response: res
    });

    agent.handleRequest(WELCOME_INTENT,FALLBACK_INTENT, SEARCH_PRODUCT, WRONG_PRODUCT);

});

//we will put response in app object that we send to the user
const app = dialogflow();

// First we plug the response to the to all intents 
app.intent(WELCOME_INTENT, (conv) => {
	conv.ask("bienvenue sur notre catalogue");
});

app.intent(FALLBACK_INTENT, (conv) => {
	conv.ask("désolé je n'ai pas compris votre demande");
});


app.intent(SEARCH_PRODUCT, (conv) => {
	conv.ask("voici le produit due vous cherchez");
});

app.intent(WRONG_PRODUCT, (conv) => {
	conv.ask("Afin de mieux répondre à votre attente, j’ai besoin de savoir si le manque de pertinence est lié aux  produits eux-mêmes, aux prix, ou autres ?");
});

export.dialogflowFirebaseFulfillment = functions.https.onRequest(app);