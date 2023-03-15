import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from nltk.sentiment import SentimentIntensityAnalyzer

# Load user data and preferences
users_df = pd.read_csv('users.csv')

# Load product data
products_df = pd.read_csv('products.csv')

# Combine user data and product data
combined_df = pd.merge(users_df, products_df, on='product_id')

# Use TF-IDF to create document vectors for product descriptions
tfidf_vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(combined_df['description'])

# Compute cosine similarity between each product
cosine_sim_matrix = cosine_similarity(tfidf_matrix)

# Define function to get recommended products for a user
def get_recommendations(user_id, num_recommendations=10):
    user_df = combined_df[combined_df['user_id'] == user_id]

    # Use sentiment analysis to calculate sentiment score for each product
    sia = SentimentIntensityAnalyzer()
    product_sentiments = []
    for product_desc in user_df['description']:
        sentiment = sia.polarity_scores(product_desc)['compound']
        product_sentiments.append(sentiment)
    user_df['sentiment'] = product_sentiments

    # Calculate weighted average of cosine similarity and sentiment score for each product
    weighted_scores = []
    for index, row in user_df.iterrows():
        product_index = products_df[products_df['product_id'] == row['product_id']].index[0]
        weighted_score = cosine_sim_matrix[product_index].dot(row['sentiment'])
        weighted_scores.append(weighted_score)
    user_df['weighted_score'] = weighted_scores

    # Sort products by weighted score and return top recommendations
    recommended_products = user_df.sort_values('weighted_score', ascending=False).head(num_recommendations)['product_id']
    return recommended_products.tolist()
