from flask import Flask, redirect, render_template, url_for

app = Flask(__name__)

PAGES = {
    "orus_home.html",
    "about_orus.html",
    "faqs_orus.html",
    "new_registration.html",
    "secondary_registration.html",
    "update_registration.html",
    "tin_verification.html",
    "digital_tin_id.html",
    "retrieve_tin.html",
    "add_branch_facility.html",
    "login.html",
}


@app.route("/")
def index():
    return render_template("orus_home.html")


@app.route("/<path:filename>")
def page(filename: str):
    if filename in PAGES:
        return render_template(filename)
    return redirect(url_for("index"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
