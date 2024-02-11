import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs-service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text"
      class="form-control"
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
  `
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!:ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) { }

  //searchTag( newTag: string) {
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    //console.log(newTag);
    //console.log("Antes de llamar a searchTag");
    this.gifsService.searchTag(newTag);
    //console.log("Despues de llamar a searchTag");
    this.tagInput.nativeElement.value = '';
  }
}
