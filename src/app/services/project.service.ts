import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Project} from "../domain/project.model";
import {from, Observable} from "rxjs";
import {mergeMap, map} from 'rxjs/operators';


@Injectable()
export class ProjectService {
	private readonly domain = 'projects';
	private headers = new HttpHeaders({
		'Content-type': 'application/json'
	})
	
	constructor(private http: HttpClient,
	            @Inject('BASE_CONFIG') private config
	) {
	}
	
	add(project: Project) {
		project.id = null;  // 防止自己携带id
		const uri = `${this.config.uri}/${this.domain}`;
		return this.http.post(uri, JSON.stringify(project), {headers: this.headers});
	}
	
	update(project: Project) {
		const uri = `${this.config.uri}/${this.domain}/${project.id}`;
		const toUpdate = {
			name: project.name,
			deac: project.desc,
			coverImg: project.coverImg
		}
		return this.http.post(uri, JSON.stringify(project), {headers: this.headers});
	}
	
	del(project: Project) {
		const delTasks$ = from(project.taskLists).pipe(mergeMap(listId => {
			return this.http.delete(`${this.config.uri}/taskLists/${listId}`)
		}));
	}
	
}
