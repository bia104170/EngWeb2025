## Exercício 1
1. Quantos registos estão na base de dados
Query: db.contratos.countDocuments()

## Exercício 2 
2. Quantos registos de contratos têm o tipo de procedimento com valor "Ajuste Direto Regime Geral"?
Query: db.contratos.find({tipoprocedimento: "Ajuste Direto Regime Geral"}).count()

## Exercício 3
3. Qual a lista de entidades comunicantes (ordenada alfabeticamente e sem repetições)?
Query: db.contratos.distinct("entidade_comunicante")

## Exercício 4
4. Qual a distribuição de contratos por tipo de procedimento (quantos contratos tem cada tipo de procedimento)?
Query:  db.contratos.aggregate([
            {
                $group: {
                    _id: "$tipoprocedimento",
                    count: {$sum: 1}
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ])

## Exercício 5
5. Qual o montante global por entidade comunicante (somatório dos contratos associados a uma entidade)?
Query:  db.contratos.aggregate([
            {
                $group: {
                    _id:"$entidade_comunicante",
                    totalMontante: {
                        $sum: {
                            $toDouble: "$precoContratual"
                            }
                        }
                    }
            },
            {
                                $sort: {totalMontante: -1}
            }
        ])