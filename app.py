from flask import Flask, render_template, request, flash, redirect, url_for
from datetime import datetime  # For future use, e.g., booking timestamps

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'  # Change to env var in prod

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
        # Handle form submission (e.g., send email or save to DB)
        name = request.form.get('name')
        event_date = request.form.get('event-date')
        services = request.form.getlist('services')  # Checkbox array
        phone = request.form.get('phone')
        # TODO: Integrate email (smtplib) or DB (SQLAlchemy)
        flash(f'Booking request from {name} for {event_date} submitted! We\'ll call on {phone}.', 'success')
        return redirect(url_for('booking'))  # Or thank you page
    return render_template('booking.html', current_page='booking')

# Contact route (with form handling)
@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('c-name')
        phone = request.form.get('c-phone')
        message = request.form.get('c-message')
        # TODO: Send email
        flash(f'Message from {name} ({phone}): {message[:50]}...', 'success')
        return redirect(url_for('contact'))
    return render_template('contact.html', current_page='contact')

# 404 Error Handler (Professional touch)
@app.errorhandler(404)
def not_found(error):
    return render_template('404.html', current_page='home'), 404  # Add 404.html later

if __name__ == '__main__':
    app.run(debug=True)