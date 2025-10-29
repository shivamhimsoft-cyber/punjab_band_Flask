from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from datetime import datetime
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change to env var in prod

# Google Sheets Setup
SCOPE = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
CREDS_FILE = 'credentials.json'  # Path to your service account JSON
SHEET_ID = '1ExPJzNYKF-gN-jjUtVMyMbfCm4SWHDADaynufjF19_0'  # From your sheet URL
SHEET_NAME = 'Sheet1'  # Default sheet name, change if needed

def get_sheet():
    try:
        creds = ServiceAccountCredentials.from_json_keyfile_name(CREDS_FILE, SCOPE)
        client = gspread.authorize(creds)
        sheet = client.open_by_key(SHEET_ID).worksheet(SHEET_NAME)
        return sheet
    except Exception as e:
        import traceback
        print("Error connecting to Google Sheet:")
        traceback.print_exc()  # This prints full error details
        return None

# Home route
@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html', current_page='home')

# Services route
@app.route('/services')
def services():
    return render_template('services.html', current_page='services')

# Gallery route
@app.route('/gallery')
def gallery():
    return render_template('gallery.html', current_page='gallery')

# Team route
@app.route('/team')
def team():
    return render_template('team.html', current_page='team')

# Booking route
@app.route('/booking', methods=['GET', 'POST'])
def booking():
    if request.method == 'POST':
        # Get form data
        name = request.form.get('name')
        event_date = request.form.get('event-date')
        services = ', '.join(request.form.getlist('services'))
        optional_services = ', '.join(request.form.getlist('optional_services')) or 'None'
        phone = request.form.get('phone')
        alternate_phone = request.form.get('alternate_phone')
        email = request.form.get('email') or 'N/A'
        message = request.form.get('message') or 'N/A'
        timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        # Save to Google Sheet - Optional Add-ons after Services
        sheet = get_sheet()
        if sheet:
            sheet.append_row([name, event_date, services, optional_services, phone, alternate_phone, email, message, timestamp])
            return jsonify({'success': True, 'message': 'Booking request submitted successfully to Google Sheet!'})
        else:
            return jsonify({'success': False, 'message': 'Error connecting to sheet. Please try again.'})

    return render_template('booking.html', current_page='booking')

# Contact route (with form handling)
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('c-name')
        phone = request.form.get('c-phone')
        message = request.form.get('c-message')
        # TODO: Save to Google Sheet or send email
        flash(f'Message from {name} ({phone}): {message[:50]}...', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html', current_page='contact')

# 404 Error Handler (Professional touch)
@app.route('/404')
def not_found(e):
    return render_template('404.html', current_page='home'), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)