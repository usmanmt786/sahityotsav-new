export function GoogleMapsURLToEmbedURL(url:string)
{
    var coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(url);
    if(coords!=null)
    {
        var coordsArray = coords[1].split(',');
        return "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d"+coordsArray[1]+"!3d"+coordsArray[0]+"!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098";
    }
}