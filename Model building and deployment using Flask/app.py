from flask import Flask, request, render_template
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)

model = joblib.load('insurance_model_pipeline.pkl')

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        age = int(request.form['age'])
        sex = request.form['sex']
        bmi = float(request.form['bmi'])
        children = int(request.form['children'])
        smoker = request.form['smoker']
        region = request.form['region']

        df = pd.DataFrame({
            'age': [age],
            'sex': [sex],
            'bmi': [bmi],
            'children': [children],
            'smoker': [smoker],
            'region': [region]
        })

        # Make prediction
        prediction = model.predict(df)
        
        prediction = np.exp(prediction)

        return render_template('index.html', prediction=f'${prediction[0]:,.2f}')
    
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)