from langchain.chat_models import ChatOpenAI
from langchain.schema import HumanMessage, SystemMessage
from langchain.chains import ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate
from elevenlabs import generate, play, stream

# Initialize the language model with your API key
llm = ChatOpenAI(openai_api_key="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")

# Define a template for a negotiation-focused conversation with defined roles
template = """
You are a master negotiator. You are ordering catering for an event you're planning. The seller will give you prices and you will negotiate with them to get the best price. You can ask for a discount, mention non-profit, educational, etc.
You're working with 500 people and budget of $2500. You want to get the best deal possible, do not reveal your budget. 
Current negotiation:
{history}
Seller: {input}
You:"""

# Create a PromptTemplate with the specified negotiation context
PROMPT = PromptTemplate(input_variables=["history", "input"], template=template)

# Set up the ConversationChain with the new prompt and negotiation focus
conversation = ConversationChain(
    prompt=PROMPT,
    llm=llm,
    memory=ConversationBufferMemory(ai_prefix="You", human_prefix="Seller"),
)

while True:
    # Get user input, assuming the user is the seller
    user_input = input("Seller: ")
    response = conversation.predict(input=user_input)
    print("AI Negotiator: ", response)
    audio = generate(
        text=response,
        voice="Bella",
        model="eleven_multilingual_v2",
        api_key="b7a769f765c2c8dc56563c7ea01d1e66",
        stream=True
        )
    stream(audio)






