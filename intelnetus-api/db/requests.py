from db.connection import open_db_session

def expand_column_size(new_length, table_name, column_name, is_production_env):
    new_length_int = str(new_length)
    new_table_name = f"{table_name}"

    cursor, connection = open_db_session(is_production_env)

    query = f"ALTER TABLE {new_table_name} MODIFY COLUMN {column_name} VARCHAR({new_length_int});"
    cursor.execute(query)
    connection.commit()


def add_publication(publication_record, connection, cursor):
    query = f"INSERT INTO publications VALUES('{publication_record.id}','{publication_record.doi}',\
        '{publication_record.year}','{publication_record.title}','{publication_record.journal}',\
        '{publication_record.abstract}','{publication_record.keywords}','{publication_record.fields}',\
        '{publication_record.fields_abbreviations}',{publication_record.citations_count},\
        {publication_record.authors_number},{publication_record.affiliations_number});"
                    
    cursor.execute(query)
    connection.commit()


def add_author(author_record, connection, cursor):
    query = f"INSERT INTO authors VALUES('{author_record.id}','{author_record.scopus_id}',\
        '{author_record.orcid_id}','{author_record.first_name}','{author_record.last_name}',\
        '{author_record.fields_of_study}','{author_record.affiliations}',{author_record.h_index},\
        {author_record.citations_count});"
    
    cursor.execute(query)
    connection.commit()
    

def add_organization(organization_record, connection, cursor):
    query = f"INSERT INTO organizations VALUES('{organization_record.id}',\
            '{organization_record.scopus_id}','{organization_record.name}','{organization_record.type_1}',\
            '{organization_record.type_2}','{organization_record.address}','{organization_record.city}',\
            '{organization_record.country}');"
    
    cursor.execute(query)
    connection.commit()