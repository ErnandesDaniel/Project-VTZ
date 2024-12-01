import parse_practices
import parse_sections_types
import parse_sections
import parse_task_vtz
import parse_task_relations


if __name__=='__main__':
    print(parse_practices.dataset)
    print('-'*100)
    parse_practices.write_to_db()

    df_types = parse_sections_types.dataset
    print(df_types)
    print('-'*100)
    parse_sections_types.write_to_db()

    print(parse_sections.dataset)
    print('-'*100)
    parse_sections.write_to_db(dict(zip(df_types['Короткое название'], df_types['id'])))

    df_vtz = parse_task_vtz.dataset
    print(df_vtz)
    print('-'*100)
    parse_task_vtz.write_to_db()

    print(parse_task_relations.dataset)
    print('-'*100)
    parse_task_relations.write_to_db(dict(zip(df_vtz['false_number'], df_vtz['id'])))