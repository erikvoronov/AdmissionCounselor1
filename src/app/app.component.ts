import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {SchoolChooserComponent} from "./school-chooser/school-chooser.component";
import {StudentChooserComponent} from "./student-chooser/student-chooser.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NgOptimizedImage, SchoolChooserComponent, StudentChooserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  appState = {};
  title = 'AdmissionsCounselor';
}
