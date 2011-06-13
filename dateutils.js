
Date.prototype.toISODateString = function() {
    function pad(n){
        return n < 10 ? '0' + n : n
    }
    function pad3(n){
        if (n < 10) return '00' + n;
        if (n < 100) return '0' + n;
        return n;
    }
    return this.getUTCFullYear()+'-'
    + pad(this.getUTCMonth()+1)+'-'
    + pad(this.getUTCDate())+'T'
    + pad(this.getUTCHours())+':'
    + pad(this.getUTCMinutes())+':'
    + pad(this.getUTCSeconds())+'.'
    + pad3(this.getUTCMilliseconds())+'Z'
}
