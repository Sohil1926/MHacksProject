
import requests
import csv

def get_flight_details(fly_from, fly_to, depart_date, return_date, limit=10):
    """
    Get flight details from Kiwi API
    fly_from: Departure airport code
    fly_to: Arrival airport code
    depart_date: Departure date in format DD/MM/YYYY
    return_date: Return date in format DD/MM/YYYY
    limit: Number of flights to return
    """
    url = "https://tequila-api.kiwi.com/v2/search"
    headers = {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Apikey": "bMdGm7ez3Tdxti068unZYc2f8QQ6WHxN",
        "Authorization": "7466697b645988cdc27d1e5110966c93a914a54946410e01101f4eb755a6c129",
        "Dnt": "1",
        "Origin": "https://greatescape.co",
        "Referer": "https://greatescape.co/",
        "Sec-Ch-Ua": '"Chromium";v="119", "Not?A_Brand";v="24"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"macOS"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    }
    params = {
        "sort": "price",
        "partner_market": "sg",
        "asc": 1,
        "fly_from": f"airport:{fly_from}",
        "fly_to": f"airport:{fly_to}",
        "curr": "USD",
        "adults": 1,
        "date_from": depart_date,
        "date_to": depart_date,
        "one_for_city": 0,
        "one_per_date": 0,
        "limit": limit,
        "max_stopovers": 3,
        "offset": 0,
        "selected_cabins": "M",
        "return_from": return_date,
        "return_to": return_date
    }

    response = requests.get(url, headers=headers, params=params)
    return response.json()

# List of random airport codes in the USA
usa_airport_codes = ["ATL", "LAX", "ORD", "DFW", "DEN", "JFK", "SFO", "SEA", "LAS", "MCO"]
arrival_airport = "DTW"  # Arrival airport code
# Loop through the list and check flight details

with open('flight_data.csv', 'r') as csvfile:
    reader = csv.reader(csvfile)
    data = list(reader)  # transforming the reader object to a list

    depart_airport_idx = data[0].index('Departing Airport') 
    arrival_airport_idx = data[0].index('Arrival Airport')

    data[0].extend(['Cost', 'DeepLink'])


   # writer.writerow(["Departure City", "Arrival City", "Departure Time (Local)", "Arrival Time (Local)", "Price", "Airline", "Deep Link"])

    for row in data[1:]:  # Skip header row
        print(row[depart_airport_idx])
        depart_airport = row[depart_airport_idx]
        arrival_airport = row[arrival_airport_idx]
        if depart_airport != arrival_airport:  
            flight_details = get_flight_details(depart_airport, arrival_airport, "1/12/2023", "5/12/2023", limit=1)
            if 'data' in flight_details.keys() and flight_details['data']:
                # print(type(flight_details['data'])) # list
                # print(flight_details['data'][0])
                flight = flight_details['data'][0]
                row.append(flight['price'])  # append cost
                row.append(flight['deep_link'])  # append deep_link

    # Write data back to file
    with open('flight_data.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)
