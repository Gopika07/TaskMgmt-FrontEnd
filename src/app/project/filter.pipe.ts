import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project.component';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: Project[], searchText: string): Project[] {
    //  console.log('items:', items, 'text:', searchText);
    if (!items) return [];
    if (!searchText) return items;
  
    return items.filter(item => {
      const searchTextLower = searchText.toLowerCase();
      const matchesNameOrDescription = item.projectName.toLowerCase().includes(searchTextLower) ||
                                        item.projectDescription.toLowerCase().includes(searchTextLower);
      const matchesId = item.projectId.toString().includes(searchText);

      return matchesNameOrDescription || matchesId;
    });
   }
}
