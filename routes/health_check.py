""" health_check """
from flask import current_app as app, jsonify

from utils.health_checker import check_database_connection


@app.route('/health', methods=['GET'])
def health():
    result = check_database_connection()
    if result.database_working:
        return jsonify(result.output), 200
    else:
        return jsonify(result.output), 500
