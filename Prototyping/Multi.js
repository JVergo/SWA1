class Multi {
    //Method to inherit from mutiple classes
    static Inherit(...bases)
    {
        class Classes {
            //Gets the bases classes
            get Base() { return bases; }

            constructor(...args) {
                var i = 0;
                //Finde the arugments for the base calsses
                for (let b of this.Base) {
                    let arugments = new b(args[i++], args[i++]); //This needs to be made more flexable #JEVA
                    Multi.Copy(this, arugments);                         
                }
            }
        }
        //Copy over porpertoes and methods
        for (let base of bases) {
            Multi.Copy(Classes, base);
            Multi.Copy(Classes.prototype, base.prototype);
        }

        return Classes;
    }

    //Copies properties from on class to another
    static Copy(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if(key !== "constructor" && key !== "prototype" && key !== "name") //Name dublication error can happen #JEVA
            {
                let dist = Object.getOwnPropertyDescriptor(source, key);
                Object.defineProperty(target, key, dist);
            }
        }
    }
}

module.exports = Multi;