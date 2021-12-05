

class UtilsServices {
    sleep(milliseconds) {
        return new Promise(resolve => setTimeout(resolve, milliseconds));
    }

}


export default new UtilsServices();