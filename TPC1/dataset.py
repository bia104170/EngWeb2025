import json

# Carregar dados do ficheiro JSON original
with open("dataset_reparacoes.json", "r", encoding="utf-8") as f:
    dataset = json.load(f)

# Criar listas para armazenar os dados
reparacoes = []
veiculos = []
intervencoes = []

def verificaVeiculoRepetido(lista, marca, modelo, matricula):
    for item in lista:
        if item["marca"] == marca and item["modelo"] == modelo and item["matricula"] == matricula:
            return True
    return False

def verificaIntervencaoRepetida(lista, codigo):
    for item in lista:
        if item["codigo"] == codigo:
            return True
    return False

for reparacao in dataset["reparacoes"]:

    veiculo = reparacao["viatura"]
    matricula = veiculo["matricula"]

    # Verificar se o veículo já existe na lista
    if not verificaVeiculoRepetido(veiculos,  veiculo["marca"], veiculo["modelo"], matricula):
        veiculos.append({
            "matricula": matricula,
            "marca": veiculo["marca"],
            "modelo": veiculo["modelo"]
        })

    intervencoes_codigos = []

    for intervencao in reparacao["intervencoes"]:
        codigo = intervencao["codigo"]

        intervencoes_codigos.append(codigo)

        if not verificaIntervencaoRepetida(intervencoes, codigo):
            intervencoes.append({
                "codigo": codigo,
                "nome": intervencao["nome"],
                "descricao": intervencao["descricao"]
            })

    reparacoes.append({
        "nome": reparacao['nome'],
        "nif": reparacao['nif'],
        "data": reparacao['data'],
        "viatura": {
            "marca": veiculo['marca'],
            "modelo": veiculo['modelo'],
            "matricula": matricula
        },
        "nr_intervencoes": len(intervencoes_codigos),
        "intervencoes": intervencoes_codigos
    })

dataset = {
    "reparacoes": reparacoes,
    "veiculos": veiculos,
    "intervencoes": intervencoes
}

ficheiro_output = "dataset_reparacoes_novo.json"

with open(ficheiro_output, "w", encoding="utf-8") as f:
    json.dump(dataset, f, indent=4, ensure_ascii=False)



