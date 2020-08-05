import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../domain/user.model";
import {Auth} from "../domain/auth.model";
import {map, switchMap} from "rxjs/operators";


@Injectable()
export class AuthService {
    private readonly domain = 'projects';
    private headers = new HttpHeaders({
        'Content-type': 'application/json'
    });
    
    private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
        '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
        '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';
    
    constructor(private http: HttpClient,
                @Inject('BASE_CONFIG') private config
    ) {
    }
    
    register(user: User): Observable<Auth> {
        user.id = null;
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get<any[]>(uri, {params: {'email': user.email}}).pipe(
            switchMap(res => {
                if (res.length > 0) throw 'user existed';
                return this.http.post<User>(uri, JSON.stringify(user), {headers: this.headers}).pipe(
                    map(res => ({
                        token: this.token,
                        user: res
                    }))
                );
            })
        );
    }
    
    login(username: string, password: string): Observable<Auth> {
        const uri = `${this.config.uri}/${this.domain}`;
        return this.http.get<any[]>(uri, {params: {'email': username, 'password': password}}).pipe(
            map(res => {
                if (res.length === 0) throw 'username or password not match';
                return {
                    token: this.token,
                    user: res[0]
                };
            })
        );
    }
}
