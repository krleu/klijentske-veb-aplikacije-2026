import { UserModel } from "../../models/user.model"

const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
                email: 'user@example.com',
                password: 'user123',
                firstName: 'Example',
                lastName: 'User',
                address: 'Street-12',
                phone: '0600000000',
                favToy: 'Puzzle',
                orders: []
            }
        if (localStorage.getItem(USERS) == null) {
            localStorage.setItem(USERS, JSON.stringify([baseUser]))
        }
        return JSON.parse(localStorage.getItem(USERS)!)
    }
    static login(email: string, password: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === email && u.password === password) {
                localStorage.setItem(ACTIVE, email)
                return true
            }
        }
        return false
    }

    static getActiveUser(): UserModel | null {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                return u
            }
        }
        return null
    }
    
    static logout(){
        localStorage.removeItem(ACTIVE)
    }
}