import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }



  //http://localhost:5000/api/v1/students?searchTerm=jack&email=jack121@example.com


  search(searchableFields: string[]) {
    const search = this?.query?.search;
    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: search, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; 
    
    console.log(queryObj)

  
    const excludeFields = ['search', 'sortBy', 'sortOrder'];

    
    excludeFields.forEach((el) => delete queryObj[el]); 
                                   
    this.modelQuery = this.modelQuery.find({author: queryObj.filter});     

    return this;
  }


  

  sortBy() {
    const sort =
      (this?.query?.sortBy as string)?.split(',')?.join(' ') || '-createdAt';        
    
    this.modelQuery = this.modelQuery.sort(sort as string);    

    return this;
  }
  sortOrder() {
    const sortField = 'createdAt';
    const sortOrder = this.query.sortOrder === 'asc' ? 1 : -1; 

    this.modelQuery = this.modelQuery.sort({ [sortField]: sortOrder });
    return this;
  }



 
}

export default QueryBuilder;
