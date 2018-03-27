import { Component, OnInit, ViewChild } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {

  btnEdit = "Join Up";

  plan_category_tab = [{ 'name': 'All', 'slug': '', 'icon':'icon-home', 'active': true }, { 'name': 'By Date', 'slug': 'date', 'icon':'icon-gift' }, { 'name': 'By location', 'slug': 'location', 'icon':'icon-upload'}, { 'name': 'By category', 'slug': 'category', 'icon':'icon-coffee'}, { 'name': 'Popular', 'slug': 'popular','icon':'icon-config' }];

  my_list: any[];
  tab_filter: any;

  listaComentarios = [
    { id: 1, name: 'Mr. Nice' },
    { id: 2, name: 'Narco' },
    { id: 3, name: 'Bombasto' },
    { id: 4, name: 'Celeritas' },
    { id: 5, name: 'Magneta' },
    { id: 6, name: 'RubberMan' },
    { id: 7, name: 'Dynama' },
    { id: 8, name: 'Dr IQ' },
    { id: 9, name: 'Magma' },
    { id: 10, name: 'Tornado' }
  ];

  idAssistent = '4';

  @ViewChild("myLabel") lab;

  constructor(private socialService: SocialService) { }

  ngOnInit() {
    this.tab_filter = "";
    this.initObjectCategorySuscribe();
  }

  initObjectCategorySuscribe() {
    this.getTabList()
      .subscribe(
      objects => {
        console.log("ALL OBJECTS")
        this.setObject(objects);
        console.log(objects)
        //this.socialService.getAllPlanByCatAssisting(objects)
      }
      );
  }

  getTabList() {
    return this.socialService.getAllPlanByCat(this.tab_filter);
  }

  tabChanged(tab) {
    var filter = "";
    filter = tab.slug;
    this.setTabFilter(filter);

    this.plan_category_tab.forEach(element => {
      if(element.slug !== tab.slug){
        element['active'] = false
      }
    });

    tab.active = true;
  }

  setTabFilter(filter) {
    console.log(filter)
    this.tab_filter = filter;
    this.initObjectCategorySuscribe();
  }

  setObject(objects) {
    this.my_list = objects;
    //this.calcItemRate();

    //FILTER BY APPROVED BEFORE SHOW
    //Ensure to get a correct JSON
    var my_json = JSON.stringify(objects)
    //We can use {'name': 'Lenovo Thinkpad 41A429ff8'} as criteria too
    var objects_filtered = this.jsonFilter(JSON.parse(my_json), { approved: true });

    this.my_list = objects_filtered;
  }

  jsonFilter(jsonObj, criteria) {
    return jsonObj.filter(function (obj) {
      return Object.keys(criteria).every(function (c) {
        return obj[c] == criteria[c];
      });
    });
  }

  assistPlan(object) {
    //id = id del plan
    let objectAssistent = { id: object.id, idAssistent: [this.idAssistent] };
    this.socialService.setAssistent(objectAssistent);
  }

  carTransition(plan){
    console.log("TE MUESTRO LISTA",plan)
    
    /*
    if (this.lab.nativeElement.classList.contains('active')) {
      this.lab.nativeElement.classList.remove('active')
    } else {
      this.lab.nativeElement.classList.add('active');
    }
    */
    //this.lab.nativeElement.classList.add("show");
    //this.lab.nativeElement.classList.remove("hide");

    plan.active = !plan.active;    
  }

}
