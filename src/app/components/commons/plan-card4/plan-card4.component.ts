import { Component, OnInit, Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-plan-card4',
  templateUrl: './plan-card4.component.html',
  styleUrls: ['./plan-card4.component.css']
})
export class PlanCard4Component implements OnInit {

  @Input() my_list;
  @Input() listaComentarios;

  isShowing = false;

  constructor() { }

  ngOnInit() {
  }

  clickCardArrow(plan) {

    if (this.isShowing) {
      // a card is already in view
      if (plan.showThis) {
        plan.showThis = false;
        this.isShowing = false;
      } else {
        this.my_list.forEach(element => {
          element.showThis = false;
        });
        plan.showThis = true;
      }

    } else {
      // no cards in view
      this.isShowing = true;
      plan.showThis = true;
    }
  }

  getListaCommentarios(firstComment,numComments){
    let comments = [];
    for(let i = firstComment; i<numComments+firstComment; i++){
      comments.push(this.listaComentarios[i])
    }
    
    return comments;
  }

}
