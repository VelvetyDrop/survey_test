# Hello World program in Python

from flask import Flask , render_template, request
from sqlalchemy import *

app.config["JSON_AS_ASCII"]  = False
app.config["JSON_SORT_KEYS"] = False


def db_connect(db_name):
    USER_NAME = ""
    PASSWORD  = ""
    db = "mysql://" + USER_NAME + ":" + PASSWORD + "@hostname/"+ db_name
    
    engine = create_engine(db)
    result = engine.execute("sql文")

    print(list(result))
    return engine


def add_data(ID,data):
    # トランザクションを使うには
    with engine.begin() as t:
        r1 = t.execute("sql文")
        t.execute('insert into 登録するDB values (:name, :age)', name=name, age=age)
        # ロールバックしたいとき
        # t.rollback()
    

app = Flask(__name__)

@app.route("/")
def display_page():
    db_name = ""
    engine = db_connect(db_name)
    hyoudai = engine.execute("表題取ってくるSQL文")
    question = engine.execute("質問取ってくるSQL文")
    answer = engine.execute("回答取ってくるSQL文")
    
    
    
    return render_template("index.html",hyoudai = hyoudai,question = question, answer = answer)
    
    
@app.route("",methods=["POST"])
def post():
    if request.method == "POST":
        ID     = request.form["id"]
        kaitou = request.form["kaitou"]
        add_data(ID,kaitou)
    else:
        kaitou = null
    return render_template("result.html", kaitou = kaitou)
    
if __name__ == "__main__":
    app.run()
    
