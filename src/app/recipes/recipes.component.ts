import { Component, OnInit } from '@angular/core';
import { RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  public recipes = [];
  public errorMsg;
  activetab = 'home';

  constructor(private _recipeService: RecipeService) { }

  ngOnInit() {
    this._recipeService.getRecipe()
        .subscribe(data => this.recipes = data,
                  error => this.errorMsg = error);
  }

  getActiveTab(tabname: string ) {
    this.activetab = tabname;
  }

}
