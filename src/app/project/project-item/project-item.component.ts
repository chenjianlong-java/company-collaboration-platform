import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {

  @Input() item;
  
  constructor() { }

  ngOnInit() {
  }
  
  onClick($event: MouseEvent) {
    
  }
  
  openUpdateDialog($event: MouseEvent) {
    
  }
  
  openInviteDialog($event: MouseEvent) {
    
  }
  
  openDeleteDialog($event: MouseEvent) {
    
  }
}
