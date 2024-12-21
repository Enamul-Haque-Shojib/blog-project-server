import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }


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

 


  

  sortBy() {
    const querySortBy = this?.query?.sortBy;
    if (querySortBy){

      const sort =(querySortBy as string)?.split(',')?.join(' ');        
    
      this.modelQuery = this.modelQuery.sort(sort as string); 
    }
      

    return this;
  }
  sortOrder() {
    const sortField = 'createdAt';
    const querySortOrder = this?.query?.sortOrder
    if(querySortOrder){
      const sortOrder = querySortOrder === 'asc' ? 1 : -1; 
      this.modelQuery = this.modelQuery.sort({ [sortField]: sortOrder });
    }
    
    return this;
  }


  filter() {
    
    const queryObj = this?.query?.filter;
    if(queryObj){
      this.modelQuery = this.modelQuery.find({author: queryObj});  
    }
                                   
       

    return this;
  }



 
}

export default QueryBuilder;
