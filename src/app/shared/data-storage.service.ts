import {Injectable} from "@angular/core";

import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";

import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from "@angular/common/http";

@Injectable()
export class DataStorageService {
  constructor(private httpClient: HttpClient,
              private recipeService: RecipeService) {}

  storeRecipes() {
    // const token = this.authService.getToken();
    // const header = new HttpHeaders().set('Authorization', 'Bearer aaklsfjaslk');

    // return this.httpClient.put('https://ng-recipe-book-27595.firebaseio.com/recipes.json',
    //   this.recipeService.getRecipes(), {
    //     observe: 'body',
    //     params: new HttpParams().set('auth', token)
    //     // headers: header
    //   });
    const req = new HttpRequest('PUT', 'https://ng-recipe-book-27595.firebaseio.com/recipes.json',
      this.recipeService.getRecipes(), {reportProgress: true})
    return this.httpClient.request(req);

  }

  getRecipes() {
    // const token = this.authService.getToken();

    // this.httpClient.get<Recipe[]>('https://ng-recipe-book-27595.firebaseio.com/recipes.json?auth=' + token)

    this.httpClient.get<Recipe[]>('https://ng-recipe-book-27595.firebaseio.com/recipes.json', {
      observe: 'body',
      responseType: 'json'
    })
      .map(
        (recipes) => {
          console.log(recipes);
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}