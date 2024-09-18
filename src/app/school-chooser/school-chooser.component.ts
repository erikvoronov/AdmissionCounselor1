import {Component} from '@angular/core';
import {UniversityService} from "../services/university.service";
import {JsonPipe, NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'school-chooser',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf,
    NgClass
  ],
  templateUrl: './school-chooser.component.html',
  styleUrl: './school-chooser.component.less'
})
export class SchoolChooserComponent {

  schools;

  constructor(private schoolService: UniversityService) {
    this.subscribeToSchools();
  }

  private subscribeToSchools(): void {
    this.schoolService.data
      .subscribe(schools => this.schools = schools);
  }

  buildSchoolName(school): string {
    const schoolName = school.name;
    const country = school.alpha_two_code;

    return `${schoolName} (${country})`;
  }

  buildSchoolLinkDisplay(school): string {
    const linkName = school.domains[0];
    return linkName.charAt(0).toUpperCase() + linkName.slice(1);
  }

  selectSchool(school): void {
    if (school.isSelected) {
      school.isSelected = false;
      return;
    }

    this.deselect();

    school.isSelected = true;
  }

  getSelectedSchool(): any{
    return this.schools.find(s => s.isSelected);
  }

  deselect(): void {
    const selectedSchool = this.schools.find(s => s.isSelected);
    selectedSchool && (selectedSchool.isSelected = false);
  }
}
