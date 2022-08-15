/*
  Catalog Item Accept Criteria validation
    - Parameter: Catalog Item Sys ID
    - Return: Is valid or no
*/

var cat_item = new sn_sc.CatItem(CatalogItemRecord.getUniqueValue());
if (!cat_item.canView())
  continue;


/* 
  Category Accept Criteria validation
      - Parameter: Category Sys ID
      - Return: Is valid or no
*/

var category = new sn_sc.CatCategory(categoryRecord.getUniqueValue());
if (!category.canView())
  continue;
