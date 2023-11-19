
import requests

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
for depart_airport in usa_airport_codes:
    if depart_airport != arrival_airport:  # Ensure departure and arrival airports are not the same
        flight_details = get_flight_details(depart_airport, arrival_airport, "1/12/2023", "5/12/2023", limit=1)
        print("--------------------------------------------------")
        print(f"Flights from {depart_airport} to {arrival_airport}:")
        for flight in flight_details['data']:
            print(f"Departure: {flight['cityFrom']} ({flight['flyFrom']})")
            print(f"Arrival: {flight['cityTo']} ({flight['flyTo']})")
            print(f"Departure Time (Local): {flight['local_departure']}")
            print(f"Arrival Time (Local): {flight['local_arrival']}")
            print(f"Price: {flight['price']} {flight_details['currency']}")
            print(f"Airline: {', '.join(flight['airlines'])}")
            print(f"Duration: Total {flight['duration']['total']} seconds")
            print(f"Bag Limit: Hand {flight['baglimit']['hand_weight']}kg, Hold {flight['baglimit']['hold_weight']}kg")
            print(f"Seats Available: {flight['availability']['seats']}")
            print(f"Booking Token: {flight['booking_token']}")
            print(f"Deep Link: {flight['deep_link']}\n")