import requests

headers = {
    'authority': 'chat.scaleconvo.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.8',
    'access-control-allow-origin': 'https://chat.scaleconvo.com, https://e5d1-2601-647-4b01-5fe0-d108-36a2-2e21-2e78.ngrok-free.app',
    'content-type': 'application/json',
    'origin': 'https://chat.scaleconvo.com',
    'referer': 'https://chat.scaleconvo.com/index.html',
    'sec-ch-ua': '"Brave";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'sec-gpc': '1',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
}

json_data = {
    'sequence': [
        {
            
            'loop': False,
            'prompt': """OPENING LINE: Hey [[name]], I am organizing a [[event]] for [[num_people]] people on [[on_dates]] and I was wondering if you could provide [[job_type]] for the event?
             \n\n CONVERSATION INTENT: \n
             /* Pause and wait for customer to respond. */

             Save the user's response to all the questions. If the user responds, ask something like this
             'Thanks [[name]]! What are your menu options and pricing?'.

             /* Pause and wait for customer to respond. */

             Your MAX budget is [[budget]] to feed [[num_people]] people. You want to get the best deal possible, do not reveal your budget. If the user responds, reiterate for the best deal possible.

             If the pricing is too high, keep negotiating. If it matches your budget requirements, say something like, 'Alright fantastic, thank you so much [[name]]. I will followup via email about this.""",

            'messages': [],
            'waitTime': '1',
            'className': 'Call',
        }

    ],
    'goals': [
        'confirmedTime',
    ],
    'template_id': 'Negotiate Deal',
    'enrich': {
        'addCorpus': 'Planes is open 8 am to 5 pm monday through friday. The following move times are available for rescheduling: Monday from 8 am to 5 pm, Tuesday from 8 am to 3 pm, Wednesday from 8 am to 5 pm, Thursday from 8 am to 3 pm, Friday from 8 am to 3 pm. You can reach our customer support team at 866-488-2017.',
    },
    'variables': {
        'name': 'Advait Paliwal',
        'event': 'hackathon',
        'job_type': 'catering',
        'num_people': '500',
        'budget': '2500',
        'phone_number': '14692037664',
        'on_dates': ['11/20/23', '11/22/23'],
        'notes': {},
        'webhook': 'https://webhook.site/92805baa-f229-4c1f-9177-9c465d5761f5'
    },
    'functions': [
    ],
    'contactId': 22,
    'apiUser': '574981fc-3182-4a29-bb91-e983102d5c29',
    'name': 'Advait Paliwal',
    'email': 'advaitspaliwal@gmail.com',
    'number': '14692037664',
    'live_transfer_number': '14692037664',
}

response = requests.post('https://chat.scaleconvo.com/mhacks', headers=headers, json=json_data)
print(response.text)