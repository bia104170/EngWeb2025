import json

def converte(input_file, output_file, list_keys):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    for item in data:
        
        for key in list_keys:
            if key in item and isinstance(item[key], str):
                cleaned = item[key][2:-2]  # remove os dois primeiros e dois últimos caracteres
                item[key] = [x.strip().strip("'").strip('"') for x in cleaned.split(",")]

       
        numeric_keys = [
            "rating", "numRatings", "likedPercent",
            "bbeScore", "bbeVotes", "price"
        ]
        for key in numeric_keys:
            if key in item and isinstance(item[key], str) and item[key].strip() != "":
                try:
                    item[key] = float(item[key])
                except ValueError:
                  
                    pass

    with open(output_file, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    print(f"Conversão concluída. O novo dataset foi salvo em {output_file}")


list_keys = ["genres", "characters", "awards", "ratingsByStars", "setting"]

# Caminhos dos ficheiros
input_file = "dataset.json"
output_file = "db_convertido.json"


converte(input_file, output_file, list_keys)
