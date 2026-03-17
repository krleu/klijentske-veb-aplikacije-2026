import { UserModel } from "../../models/user.model"
import { User } from "../user/user"

const USERS = 'users'
const ACTIVE = 'active'

export class AuthService {
    static getUsers(): UserModel[] {
        const baseUser: UserModel = {
            email: 'user@example.com',
            password: 'user123',
            firstName: 'Uros',
            lastName: 'Krstic',
            address: 'Ulica-12',
            phone: '0600000000',
            favToy: 'Figura',
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

    static updateActiveUser(newUserData: UserModel) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.firstName = newUserData.firstName
                u.lastName = newUserData.lastName
                u.address = newUserData.address
                u.phone = newUserData.phone
                u.favToy = newUserData.favToy
                u.orders = newUserData.orders
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static updateActiveUserPassword(newPassword: string) {
        const users = this.getUsers()
        for (let u of users) {
            if (u.email === localStorage.getItem(ACTIVE)) {
                u.password = newPassword
            }
        }
        localStorage.setItem(USERS, JSON.stringify(users))
    }

    static logout() {
        localStorage.removeItem(ACTIVE)
    }

    static createUser(user: Partial<UserModel>) {
        const users = this.getUsers();
        user.orders = []
        users.push(user as UserModel);
        localStorage.setItem(USERS, JSON.stringify(users));
    }

    static existsByEmail(email:string){
        const users = this.getUsers()
        for(let u of users){
            if (u.email === email) return true
        }
        return false
    }
}