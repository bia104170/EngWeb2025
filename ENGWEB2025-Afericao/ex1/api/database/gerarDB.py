import json

def clean_json(input_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    autor_id = 1
    lista = {}
    
    autores = []
    livros = []


    for item in data:
        
        autor = item['author']
        
        if autor not in lista:
            new_autor = {}
            new_autor['name'] = autor
            new_autor['_id'] = 'author' + str(autor_id)
            new_autor['books'] = []
            autor_id += 1    
            lista[autor] = new_autor
            
        lista[autor]['books'].append({
                    'bookId': item['_id'],
                    'title': item['title'],
                    'series': item['series'],
                    'genres': item['genres'],
                    'publishDate': item['publishDate']})
        
                
        item['author_id'] = lista[autor]['_id']
        livros.append(item)
            
    for i in lista.keys():
        lista[i]['books_count'] = len(lista[i]['books'])
        autores.append(lista[i])
        
        
    with open("autores.json", 'w', encoding='utf-8', newline='\n') as f:
        json.dump(autores, f, indent=4, ensure_ascii=False)
        
    with open("db.json", 'w', encoding='utf-8', newline='\n') as f:
        json.dump(livros, f, indent=4, ensure_ascii=False)
 

input_file = "db_convertido.json"  

clean_json(input_file)