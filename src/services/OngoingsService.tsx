import $api from '../API/index.js'



export default class OngoingsService {
    static async getAllOngoings(): Promise<any> {
       return $api.get('/api/ongoings')
    }

    static async deleteOneOngoing(name: string): Promise<any> {
        return $api.delete(`/api/ongoings/${name}`)
    }
}