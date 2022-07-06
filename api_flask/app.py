from crypt import methods
from flask import Flask, request, jsonify
import json

app = Flask(__name__)

repository = []
repositoryAdjust = []
Movimentacoes = []
return_mov = []

@app.route("/msg", methods=["POST"])
def get_messages():
    _json = request.get_json()
    repository.append(_json)
    for val in repository:
        _json_check = json.loads(val['data'])
        Movimentacoes.append(_json_check)
        if not repositoryAdjust:
            repositoryAdjust.append(_json_check)
        else:
            for val in repositoryAdjust:
                if val['agencia'] == _json_check['agencia'] and val['conta'] == _json_check['conta']:
                    val['saldo'] = _json_check['saldo']
                else:
                    repositoryAdjust.append(_json_check)

    print(repositoryAdjust)
    return jsonify(repositoryAdjust)

@app.route("/conta/listar", methods=["GET"])
def get_folha_list():
    return jsonify(repositoryAdjust)

@app.route("/conta/saldo/<agencia>/<conta>")
def get_saldo_agencia_conta(agencia, conta):
    for val in repositoryAdjust:
        if val['agencia'] == agencia and val['conta'] == conta:
            return val
    return '', 400

@app.route("/conta/movimentacoes/<agencia>/<conta>")
def get_mov_agencia_conta(agencia, conta):
    for val in Movimentacoes:
        if val['agencia'] == agencia and val['conta'] == conta:
            return_mov.append(val)
    return return_mov