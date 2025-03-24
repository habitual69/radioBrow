Here’s a condensed version of the API documentation with **sample JSON responses** included for key endpoints:

---

### **General**
- **Server Version**: 0.7.31  
- **Usage**: Free to use, no guarantees. Downtimes possible.  
- **Contact**: segler_alex AT web DOT de for feedback or ideas.  
- **User-Agent**: Include a descriptive User-Agent in HTTP requests (e.g., "AppName/Version").  
- **Station Checks**: Stations are checked daily for availability (`LastCheckOK=0/1`).  
- **Feature Requests**: Submit via GitLab or fork and create a pull request.  
- **Request Types**: Supports `GET`, `POST` (x-www-form-urlencoded), and `application/json`.

---

### **Structs**

#### **Station**
- **Fields**:  
  - `changeuuid`, `stationuuid`, `name`, `url`, `url_resolved`, `homepage`, `favicon`, `tags`, `country`, `countrycode`, `state`, `iso_3166_2`, `language`, `languagecodes`, `votes`, `lastchangetime`, `codec`, `bitrate`, `hls`, `lastcheckok`, `lastchecktime`, `clicktimestamp`, `clickcount`, `clicktrend`, `ssl_error`, `geo_lat`, `geo_long`, `geo_distance`, `has_extended_info`.  

- **Sample JSON**:
  ```json
  {
    "changeuuid": "01234567-89ab-cdef-0123-456789abcdef",
    "stationuuid": "01234567-89ab-cdef-0123-456789abcdef",
    "name": "Best Radio",
    "url": "http://www.example.com/test.pls",
    "url_resolved": "http://stream.example.com/mp3_128",
    "homepage": "https://www.example.com",
    "favicon": "https://www.example.com/icon.png",
    "tags": "jazz,pop,rock,indie",
    "country": "Switzerland",
    "countrycode": "US",
    "iso_3166_2": "US-NY",
    "state": "",
    "language": "german,english",
    "languagecodes": "ger,eng",
    "votes": 0,
    "lastchangetime": "2019-12-12 18:37:02",
    "codec": "MP3",
    "bitrate": 128,
    "hls": 0,
    "lastcheckok": 1,
    "lastchecktime": "2020-01-09 18:16:35",
    "clicktimestamp": "",
    "clickcount": 0,
    "clicktrend": 0,
    "ssl_error": 0,
    "geo_lat": 1.1,
    "geo_long": -2.2,
    "geo_distance": 1234.56789,
    "has_extended_info": false
  }
  ```

---

### **Endpoints**

#### **Lists**
- **Countries**: `/json/countries`, `/xml/countries`, `/csv/countries`.  
  - **Sample JSON**:
    ```json
    [
      {
        "name": "Albania",
        "iso_3166_1": "AL",
        "stationcount": "1"
      },
      {
        "name": "Argentina",
        "iso_3166_1": "AR",
        "stationcount": "5"
      }
    ]
    ```

- **Codecs**: `/json/codecs`, `/xml/codecs`.  
  - **Sample JSON**:
    ```json
    [
      {
        "name": "AAC",
        "stationcount": "34"
      },
      {
        "name": "AAC+",
        "stationcount": "367"
      }
    ]
    ```

- **Languages**: `/json/languages`, `/xml/languages`.  
  - **Sample JSON**:
    ```json
    [
      {
        "name": "albanian",
        "iso_639": "sq",
        "stationcount": "1"
      },
      {
        "name": "american english",
        "iso_639": null,
        "stationcount": "8"
      }
    ]
    ```

---

#### **Stations**
- **Search Stations**: `/json/stations/search`.  
  - **Sample JSON**:
    ```json
    [
      {
        "name": "Best Radio",
        "url": "http://stream.example.com/mp3_128",
        "homepage": "https://www.example.com",
        "favicon": "https://www.example.com/icon.png",
        "tags": "jazz,pop,rock,indie",
        "country": "Switzerland",
        "countrycode": "CH",
        "state": "",
        "language": "german,english",
        "votes": 0,
        "codec": "MP3",
        "bitrate": 128,
        "lastcheckok": 1
      }
    ]
    ```

- **Top Clicked Stations**: `/json/stations/topclick`.  
  - **Sample JSON**:
    ```json
    [
      {
        "name": "Top Radio",
        "url": "http://stream.example.com/mp3_128",
        "clickcount": 1000
      },
      {
        "name": "Second Radio",
        "url": "http://stream.example.com/mp3_256",
        "clickcount": 800
      }
    ]
    ```

- **Recently Changed Stations**: `/json/stations/lastchange`.  
  - **Sample JSON**:
    ```json
    [
      {
        "name": "New Radio",
        "url": "http://stream.example.com/mp3_128",
        "lastchangetime": "2023-10-01 12:34:56"
      }
    ]
    ```

---

#### **Station Management**
- **Vote for Station**: `/json/vote/stationuuid`.  
  - **Sample JSON**:
    ```json
    {
      "ok": true,
      "message": "voted for station successfully"
    }
    ```

- **Add Station**: `/json/add`.  
  - **Sample JSON**:
    ```json
    {
      "ok": true,
      "message": "station was added",
      "uuid": "550e8400-e29b-11d4-a716-446655440000"
    }
    ```

---

#### **Server Info**
- **Stats**: `/json/stats`.  
  - **Sample JSON**:
    ```json
    {
      "supported_version": 1,
      "software_version": "0.5.0",
      "status": "OK",
      "stations": 4047,
      "stations_broken": 45,
      "tags": 677,
      "clicks_last_hour": 65,
      "clicks_last_day": 1822,
      "languages": 59,
      "countries": 81
    }
    ```

- **Mirrors**: `/json/servers`.  
  - **Sample JSON**:
    ```json
    [
      {
        "ip": "95.179.139.106",
        "name": "nl1.api.radio-browser.info"
      },
      {
        "ip": "89.58.16.19",
        "name": "at1.api.radio-browser.info"
      }
    ]
    ```

---


ORGINAL DOCUMENTATION:
Community Radio Station Index
General
Server version: 0.7.31

This webservice can be used freely but without guarantee to work. I have been keeping it online since December, 2015, but downtimes are possible and I am not always home to fix it :) Please do not hesitate to send me ideas to improve the service at segler_alex AT web DOT de.
Please send a descriptive User-Agent in your HTTP requests, which makes it easier for me to get in touch with developers to help with the usage of the API. Something like "appname/appversion", for example "Cool Radio App/1.2". This also helps me to know which apps are using this service, so I can keep the list of apps up to date and tell people in which ways they can use this service.
If you know an app that is using this service but not listed on www.radio-browser.info, please drop me a note.
Thank you! At the moment this service checks radio stations by connecting to them at least every day and marks them accordingly. (LastCheckOK=0/1)
If you can't find what you are looking for here, please create a feature request on GitLab or if you are a programmer, fork it and make a pull request. Thanks for your help! Recent changes can be found in the Changelog.

Please note that all the parameters listed below can be added by using an HTTP POST request with the encoding "x-www-form-urlencoded" instead of GET request, and they can also be sent with encoding "application/json" used by Angular.js, for example.
Struct Station
Fields:
Name	Possible value/Datatype	Description
changeuuid	UUID	A globally unique identifier for the change of the station information
stationuuid	UUID	A globally unique identifier for the station
name	string	The name of the station
url	string, URL (HTTP/HTTPS)	The stream URL provided by the user
url_resolved	string, URL (HTTP/HTTPS)	An automatically "resolved" stream URL. Things resolved are playlists (M3U/PLS/ASX...), HTTP redirects (Code 301/302). This link is especially usefull if you use this API from a platform that is not able to do a resolve on its own (e.g. JavaScript in browser) or you just don't want to invest the time in decoding playlists yourself.
homepage	string, URL (HTTP/HTTPS)	URL to the homepage of the stream, so you can direct the user to a page with more information about the stream.
favicon	string, URL (HTTP/HTTPS)	URL to an icon or picture that represents the stream. (PNG, JPG)
tags	string, multivalue, split by comma	Tags of the stream with more information about it
country	string	DEPRECATED: use countrycode instead, full name of the country. Currently it is autogenerated from the countrycode.
countrycode	2 letters, uppercase	Official countrycodes as in ISO 3166-1 alpha-2
state	string	Full name of the entity where the station is located inside the country
iso_3166_2	string	The ISO-3166-2 code of the entity where the station is located inside the country
language	string, multivalue, split by comma	Languages that are spoken in this stream.
languagecodes	string, multivalue, split by comma	Languages that are spoken in this stream by code ISO 639-2/B
votes	number, integer	Number of votes for this station. This number is by server and only ever increases. It will never be reset to 0.
lastchangetime	datetime, YYYY-MM-DD HH:mm:ss	Last time when the stream information was changed in the database
lastchangetime_iso8601	datetime, ISO 8601	Last time when the stream information was changed in the database
codec	string	The codec of this stream recorded at the last check.
bitrate	number, integer, bps	The bitrate of this stream recorded at the last check.
hls	0 or 1	Mark if this stream is using HLS distribution or non-HLS.
lastcheckok	0 or 1	The current online/offline state of this stream. This is a value calculated from multiple measure points in the internet. The test servers are located in different countries. It is a majority vote.
lastchecktime	datetime, YYYY-MM-DD HH:mm:ss	The last time when any radio-browser server checked the online state of this stream
lastchecktime_iso8601	datetime, ISO 8601	The last time when any radio-browser server checked the online state of this stream
lastcheckoktime	datetime, YYYY-MM-DD HH:mm:ss	The last time when the stream was checked for the online status with a positive result
lastcheckoktime_iso8601	datetime, ISO 8601	The last time when the stream was checked for the online status with a positive result
lastlocalchecktime	datetime, YYYY-MM-DD HH:mm:ss	The last time when this server checked the online state and the metadata of this stream
lastlocalchecktime_iso8601	datetime, ISO 8601	The last time when this server checked the online state and the metadata of this stream
clicktimestamp	datetime, YYYY-MM-DD HH:mm:ss	The time of the last click recorded for this stream
clicktimestamp_iso8601	datetime, ISO 8601	The time of the last click recorded for this stream
clickcount	number, integer	Clicks within the last 24 hours
clicktrend	number, integer	The difference of the clickcounts within the last 2 days. Posivite values mean an increase, negative a decrease of clicks.
ssl_error	number, integer	0 means no error, 1 means that there was an ssl error while connecting to the stream url.
geo_lat	number, double	Latitude on earth where the stream is located.
geo_long	number, double	Longitude on earth where the stream is located.
geo_distance	number, double	Distance of the station in meters. ONLY set if geo_lat AND geo_long are set on the station AND on the request.
has_extended_info	bool, optional	Is true, if the stream owner does provide extended information as HTTP headers which override the information in the database.
Example JSON:
  {
    "changeuuid":"01234567-89ab-cdef-0123-456789abcdef",
    "stationuuid":"01234567-89ab-cdef-0123-456789abcdef",
    "name":"Best Radio",
    "url":"http://www.example.com/test.pls",
    "url_resolved":"http://stream.example.com/mp3_128",
    "homepage":"https://www.example.com",
    "favicon":"https://www.example.com/icon.png",
    "tags":"jazz,pop,rock,indie",
    "country":"Switzerland",
    "countrycode":"US",
    "iso_3166_2": "US-NY",
    "state":"",
    "language":"german,english",
    "languagecodes":"ger,eng"
    "votes":0,
    "lastchangetime":"2019-12-12 18:37:02",
    "lastchangetime_iso8601":"2019-12-12T18:37:02Z",
    "codec":"MP3",
    "bitrate":128,
    "hls":0,
    "lastcheckok":1,
    "lastchecktime":"2020-01-09 18:16:35",
    "lastchecktime_iso8601":"2020-01-09T18:16:35Z",
    "lastcheckoktime":"2020-01-09 18:16:35",
    "lastcheckoktime_iso8601":"2020-01-09T18:16:35Z",
    "lastlocalchecktime":"2020-01-08 23:18:38",
    "lastlocalchecktime_iso8601":"2020-01-08T23:18:38Z",
    "clicktimestamp":"",
    "clicktimestamp_iso8601":null,
    "clickcount":0,
    "clicktrend":0,
    "ssl_error": 0,
    "geo_lat": 1.1,
    "geo_long": -2.2,
    "geo_distance": 1234.56789,
    "has_extended_info": false
  }
                
Example XML:
  <station
    changeuuid="01234567-89ab-cdef-0123-456789abcdef"
    stationuuid="01234567-89ab-cdef-0123-456789abcdef"
    name="Best radio"
    url="http://www.example.com/test.pls"
    url_resolved="http://stream.example.com/mp3_128"
    homepage="https://www.example.com"
    favicon="https://www.example.com/icon.png"
    tags="jazz,pop,rock,indie"
    country="Switzerland"
    countrycode="US"
    iso_3166_2="US-NY",
    state=""
    language="german,english"
    languagecodes="ger,eng"
    votes="0"
    lastchangetime="2019-12-12 18:37:02"
    lastchangetime_iso8601="2019-12-12T18:37:02Z"
    codec="MP3"
    bitrate="128"
    hls="0"
    lastcheckok="1"
    lastchecktime="2020-01-09 18:16:35"
    lastchecktime_iso8601="2020-01-09T18:16:35Z"
    lastcheckoktime="2020-01-09 18:16:35"
    lastcheckoktime_iso8601="2020-01-09T18:16:35Z"
    lastlocalchecktime="2020-01-08 23:18:38"
    lastlocalchecktime_iso8601="2020-01-08T23:18:38Z"
    clicktimestamp=""
    clickcount="0"
    clicktrend="0"
    ssl_error="0"
    geo_lat="1.1"
    geo_long="-2.2"
    geo_distance="1234.56789"
    has_extended_info="false"/>

            
Example M3U playlist with extension field:
The M3U files created by this server are extended with an additional field, that can be used to identify entries of the file with this server. The field is added as a special comment, so it will not interfere with normal operations of players, that use this playlist.
  #EXTM3U
  #RADIOBROWSERUUID:01234567-89ab-cdef-0123-456789abcdef
  #EXTINF:-1,Best Radio
  http://stream.example.com/mp3_128

  #RADIOBROWSERUUID:11234567-89ab-cdef-0123-456789abcdef
  #EXTINF:-1,Other Radio
  http://stream.example2.com/mp3_256
            
Example XSPF playlist with extension field:
The XSPF files created by this server are extended with an additional field, that can be used to identify entries of the file with this server. We try to be consistent with the specification at https://xspf.org/orig-xspf-v1.html
  <?xml version="1.0" encoding="UTF-8" ?>
  <playlist version="1" xmlns="http://xspf.org/ns/0/">
    <trackList>
      <track>
        <title>Best Radio</title>
        <location>http://stream.example.com/mp3_128</location>
        <image>http://example.com/favicon.ico</image>
        <identifier>radiobrowser:01234567-89ab-cdef-0123-456789abcdef</identifier>
      </track>
      <track>
        <title>Other Radio</title>
        <location>https://stream.example2.com/mp3_256</location>
        <image>http://example2.com/favicon.ico</image>
        <identifier>radiobrowser:11234567-89ab-cdef-0123-456789abcdef</identifier>
      </track>
    </trackList>
  </playlist>
            
Struct StationCheck
This struct is used in a represent an online check of a stream. Most of the information got extracted by checking the http headers of the stream.

Fields:
Name	Possible value/Datatype	Description	Nullable
checkuuid	UUID	An unique id for this StationCheck	NO
stationuuid	UUID	An unique id for referencing a Station	NO
source	string	DNS Name of the server that did the stream check.	NO
codec	string	High level name of the used codec of the stream. May have the format AUDIO or AUDIO/VIDEO.	NO
bitrate	number, integer	Bitrate 1000 bits per second (kBit/s) of the stream. (Audio + Video)	NO
hls	number, integer	1 means this is an HLS stream, otherwise 0.	NO
ok	number, integer	1 means this stream is reachable, otherwise 0.	NO
timestamp_iso8601	ISO-8601 datetime string	Date and time of check creation	NO
timestamp	datetime, YYYY-MM-DD HH:mm:ss	Date and time of check creation	NO
urlcache	string, URL (HTTP/HTTPS)	Direct stream url that has been resolved from the main stream url. HTTP redirects and playlists have been decoded. If hls==1 then this is still a HLS-playlist.	NO
metainfo_overrides_database	number, integer	1 means this stream has provided extended information and it should be used to override the local database, otherwise 0.	NO
public	number, integer	1 that this stream appears in the public shoutcast/icecast directory, otherwise 0.	YES
name	string	The name extracted from the stream header.	YES
description	string	The description extracted from the stream header.	YES
tags	string	Komma separated list of tags. (genres of this stream)	YES
countrycode	string	Official countrycodes as in ISO 3166-1 alpha-2	YES
countrysubdivisioncode	string	Official country subdivision codes as in ISO 3166-2	YES
homepage	string	The homepage extracted from the stream header.	YES
favicon	string	The favicon extracted from the stream header.	YES
loadbalancer	string	The loadbalancer extracted from the stream header.	YES
server_software	string	The name of the server software used.	YES
sampling	number, unsigned integer	Audio sampling frequency in Hz	YES
timing_ms	number, unsigned integer	Timespan in miliseconds this check needed to be finished.	NO
languagecodes	string	The description extracted from the stream header.	YES
ssl_error	number, unsigned integer	1 means that a ssl error occured while connecting to the stream, 0 otherwise.	NO
geo_lat	number, double	Latitude on earth where the stream is located.	YES
geo_long	number, double	Longitude on earth where the stream is located.	YES
Example JSON:
  {
    "stationuuid":"960e57c5-0601-11e8-ae97-52543be04c81",
    "checkuuid":"18be4561-309a-11ea-b37a-0242ac120002",
    "source":"at1.api.radio-browser.info",
    "codec":"MP3",
    "bitrate":128,
    "hls":0,
    "ok":1,
    "timestamp":"2020-01-06 15:34:58",
    "timestamp_iso8601":"2020-01-06T15:34:58Z",
    "urlcache":"http://stream.example.com/mp3_128",
    "metainfo_overrides_database":0,
    "public":null,
    "name":null,
    "description":null,
    "tags":null,
    "countrycode":null,
    "countrysubdivisioncode": null,
    "homepage":null,
    "favicon":null,
    "loadbalancer":null,
    "server_software": "Icecast 2.4.0",
    "sampling": 44100,
    "timing_ms": 495,
    "languagecodes": null,
    "ssl_error": 0,
    "geo_lat": 1.1,
    "geo_long": -2.2
  }
                
Example XML:
  <check
    stationuuid="01234567-89ab-cdef-0123-456789abcdef"
    checkuuid="01234567-89ab-cdef-0123-456789abcdef"
    source="at1.api.radio-browser.info"
    codec="MP3"
    bitrate="128"
    hls="0"
    ok="1"
    urlcache="http://stream.example.com/mp3_128"
    timestamp="2020-01-06 15:34:58"
    metainfo_overrides_database="0"
    public="0"
    name=""
    description=""
    tags=""
    homepage=""
    loadbalancer=""
    favicon=""
    countrycode=""
    countrysubdivisioncode=""
    server_software="Icecast 2.4.2"
    sampling="44100"
    timing_ms="495"
    languagecodes=""
    ssl_error="0"
    geo_lat="1.1"
    geo_long="-2.2"/>
            
Example CSV:
stationuuid,checkuuid,source,codec,bitrate,hls,ok,timestamp_iso8601,timestamp,urlcache,metainfo_overrides_database,public,name,description,tags,countrycode,homepage,favicon,loadbalancer,do_not_index,countrysubdivisioncode,server_software,sampling,timing_ms,languagecodes,ssl_error,geo_lat,geo_long
01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,at1.api.radio-browser.info,MP3,192,0,1,2021-04-16T08:07:45Z,2021-04-16 08:07:45,http://stream.example.com/mp3_128,0,,,,,,,,,,,Icecast 2.4.2,,495,,0,,
            
Struct StationCheckStep
This struct is used in a tree structure to represent all codepaths that were necessary to check an address of a single stream. Steps can cause multiple other steps for example playlists.

Fields:
Name	Possible value/Datatype	Description	Nullable
stepuuid	UUID	An unique id for this StationCheckStep	NO
parent_stepuuid	UUID	An unique id for referencing another StationCheckStep. Is set if this step has a parent.	YES
checkuuid	UUID	An unique id for referencing a StationCheck	NO
stationuuid	UUID	An unique id for referencing a Station	NO
url	string, URL (HTTP/HTTPS)	The url that this step of the checking process handled	NO
urltype	string	Does represent which kind of url it is. One of the following: STREAM, REDIRECT, PLAYLIST.	YES
error	string	URL to the homepage of the stream, so you can direct the user to a page with more information about the stream.	YES
creation_iso8601	ISO-8601 datetime string	Date and time of step creation	NO
Example JSON:
  {
    "stepuuid": "01234567-89ab-cdef-0123-456789abcdef",
    "parent_stepuuid": "01234567-89ab-cdef-0123-456789abcdef",
    "checkuuid": "01234567-89ab-cdef-0123-456789abcdef",
    "stationuuid": "01234567-89ab-cdef-0123-456789abcdef",
    "url": "http://stream.example.com:8000/streamname",
    "urltype": "STREAM",
    "error": "BadError",
    "creation_iso8601": "2021-04-13T20:11:19Z"
  }
                
Example XML:
  <checkstep
    stepuuid="01234567-89ab-cdef-0123-456789abcdef"
    parent_stepuuid="01234567-89ab-cdef-0123-456789abcdef"
    checkuuid="01234567-89ab-cdef-0123-456789abcdef"
    stationuuid="01234567-89ab-cdef-0123-456789abcdef"
    url="http://stream.example.com:8000/streamname"
    urltype="STREAM"
    error="BadError"
    creation_iso8601="2021-04-13T20:11:19Z"/>
            
Example CSV:
stepuuid,parent_stepuuid,checkuuid,stationuuid,url,urltype,error,creation_iso8601
01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,http://stream.example.com:8000/streamname,STREAM,BadError,2021-04-13T20:11:19Z
            
Struct StreamingServer
This struct is used in a tree structure to represent all codepaths that were necessary to check an address of a single stream. Steps can cause multiple other steps for example playlists.

Fields:
Name	Possible value/Datatype	Description	Nullable
uuid	UUID	An unique id for this StreamingServer	NO
url	string, URL (HTTP/HTTPS)	The url that this streaming server	NO
statusurl	string, URL (HTTP/HTTPS)	The url for fetching extended meta information from this streaming server	YES
error	string	If this field exists, the server either does not have extended information or the information was not parsable	YES
admin	string/email	Administrative contact of the streaming server	NO
location	string/address	Physical location of the streaming server	NO
software	string	Server software name and version	NO
Example JSON:
[
  {
    "uuid":"11234567-89ab-cdef-0123-456789abcdef",
    "url":"https://my.url/",
    "statusurl":"https://my.url/status.xsl",
    "admin":"tester@example.com",
    "location":"Mars, high street 3",
    "software": "Icecast 2.4.4"
  },
  {
    "uuid":"11234567-89ab-cdef-0123-456789abcdff",
    "url":"http://my.url/",
    "error":"ResultDecodeError"
  }
]
                
Example XML:
<streamingservers>
  <streamingserver>
    <uuid/>11234567-89ab-cdef-0123-456789abcdef</uuid>
    <url>https://my.url</url>
    <statusurl>https://my.url/status.xsl</statusurl>
    <admin>tester@example.com</admin>
    <location>Mars, high street 3</location>
    <software>Icecast 2.4.4</software>
  </streamingserver>

  <streamingserver>
    <uuid/>11234567-89ab-cdef-0123-456789abcdff</uuid>
    <url>https://my.url</url>
    <error></error>
  </streamingserver>
  ..
</streamingservers>
            
Example CSV:
stepuuid,parent_stepuuid,checkuuid,stationuuid,url,urltype,error,creation_iso8601
01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef,http://stream.example.com:8000/streamname,STREAM,BadError,2021-04-13T20:11:19Z
            
List of countries
A JSON-encoded list of all countries in the database. If a filter is given, it will only return the ones containing the filter as substring, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/json/countries
http://de2.api.radio-browser.info/json/countries/<filter>
http://de2.api.radio-browser.info/xml/countries
http://de2.api.radio-browser.info/xml/countries/<filter>
Parameter:
Name	Default value	Possible value	Description
order	name	name, stationcount	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
hidebroken	false	true, false	do not count broken stations
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result JSON:
                [
                {
                  "name": "Albania",
                  "iso_3166_1": "AL",
                  "stationcount": "1"
                },
                {
                  "name": "Argentina",
                  "iso_3166_1": "AR",
                  "stationcount": "5"
                },
                ..
                ]
                
Result XML:
                <result>
                <country name="Albania" iso_3166_1="AL" stationcount="1"/>
                <country name="Argentina" iso_3166_1="AR" stationcount="5"/>
                ..
                </result>
                
Example:
http://de2.api.radio-browser.info/json/countries
http://de2.api.radio-browser.info/xml/countries/aus
List of country codes (DEPRECATED)
DEPRECATED: Please use countries endpoint instead. It has name and countrycode information.

A JSON-encoded list of all countries in the database. If a filter is given, it will only return the ones containing the filter as substring, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/json/countrycodes
http://de2.api.radio-browser.info/json/countrycodes/<filter>
http://de2.api.radio-browser.info/xml/countrycodes
http://de2.api.radio-browser.info/xml/countrycodes/<filter>
Parameter:
Name	Default value	Possible value	Description
order	name	name, stationcount	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
hidebroken	false	true, false	do not count broken stations
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result JSON:
                [
                {
                  "name": "AT",
                  "stationcount": "1"
                },
                {
                  "name": "DE",
                  "stationcount": "5"
                },
                ..
                ]
                
Result XML:
                <result>
                <country name="AT" stationcount="1"/>
                <country name="DE" stationcount="5"/>
                ..
                </result>
                
Example:
http://de2.api.radio-browser.info/json/countrycodes
http://de2.api.radio-browser.info/xml/countrycodes/at
List of codecs
A JSON-encoded list of all codecs in the database. If a filter is given, it will only return the ones containing the filter as substring, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/json/codecs
http://de2.api.radio-browser.info/json/codecs/<filter>
http://de2.api.radio-browser.info/xml/codecs
http://de2.api.radio-browser.info/xml/codecs/<filter>
Parameter:
Name	Default value	Possible value	Description
order	name	name, stationcount	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
hidebroken	false	true, false	do not count broken stations
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result JSON:
            [
                {
                    "name": "AAC",
                    "stationcount": "34"
                },
                {
                    "name": "AAC+",
                    "stationcount": "367"
                },
                ..
            ]
                
Result XML:
                  
                    <result>
                      <codec name="AAC" stationcount="34"/>
                      <codec name="AAC+" stationcount="367"/>
                      ..
                    </result>
                  
                
Example:
http://de2.api.radio-browser.info/json/codecs
http://de2.api.radio-browser.info/xml/codecs/aac
List of states
A JSON-encoded list of all states in the database. Countries are divided into states. If a filter is given, it will only return the ones containing the filter as substring. If a country is given, it will only display states in this country, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/json/states
http://de2.api.radio-browser.info/json/states/<filter>
http://de2.api.radio-browser.info/json/states/<country>/<filter>
http://de2.api.radio-browser.info/xml/states
http://de2.api.radio-browser.info/xml/states/<filter>
http://de2.api.radio-browser.info/xml/states/<country>/<filter>
Parameter:
Name	Default value	Possible value	Description
order	name	name, stationcount	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
hidebroken	false	true, false	do not count broken stations
country		STRING	OPTIONAL, filter states by country name
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result JSON:
                [
                    {
                        "name": "Alabama",
                        "country": "United States of America",
                        "stationcount": "6"
                    },
                    {
                        "name": "Alberta",
                        "country": "Canada",
                        "stationcount": "2"
                    },
                    ..
                ]
                    
Result XML:
                <result>
                  <state name="Alabama" country="United States of America" stationcount="6"/>
                  <state name="Alberta" country="Canada" stationcount="2"/>
                  ..
                </result>
                    
Example:
http://de2.api.radio-browser.info/json/states
http://de2.api.radio-browser.info/xml/states/ber
http://de2.api.radio-browser.info/json/states/Germany/ber
List of languages
A JSON-encoded list of all languages in the database. If a filter is given, it will only return the ones containing the filter as substring, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/json/languages
http://de2.api.radio-browser.info/json/languages/<filter>
http://de2.api.radio-browser.info/xml/languages
http://de2.api.radio-browser.info/xml/languages/<filter>
http://de2.api.radio-browser.info/csv/languages
http://de2.api.radio-browser.info/csv/languages/<filter>
Parameter:
Name	Default value	Possible value	Description
order	name	name, stationcount	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
hidebroken	false	true, false	do not count broken stations
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result JSON:
          [
              {
                  "name": "albanian",
                  "iso_639": "sq",
                  "stationcount": "1"
              },
              {
                  "name": "american english",
                  "iso_639": null,
                  "stationcount": "8"
              },
              ..
          ]
              
Result XML:
          <result>
            <language name="albanian" iso_639="sq" stationcount="1"/>
            <language name="american english" stationcount="8"/>
            ..
          </result>
              
Example:
http://de2.api.radio-browser.info/json/languages
http://de2.api.radio-browser.info/xml/languages/ger
List of tags
A JSON-encoded list of all tags in the database. If a filter is given, it will only return the ones containing the filter as substring, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/xml/tags
http://de2.api.radio-browser.info/xml/tags/<filter>
http://de2.api.radio-browser.info/json/tags
http://de2.api.radio-browser.info/json/tags/<filter>
Parameter:
Name	Default value	Possible value	Description
order	name	name, stationcount	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
hidebroken	false	true, false	do not count broken stations
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result JSON:
          [
              {
                  "name": "00s",
                  "stationcount": "3"
              },
              {
                  "name": "10s",
                  "stationcount": "1"
              },
              ..
          ]
              
Result XML:
          <result>
            <tag name="00s" stationcount="3"/>
            <tag name="10s" stationcount="1"/>
            ..
          </result>
              
Example:
http://de2.api.radio-browser.info/json/tags
http://de2.api.radio-browser.info/xml/tags/jazz
List of radio stations
A list of radio stations that match the search. The variants with "exact" will only search for perfect matches, and others will search for the station whose attribute contains the search term.
Please use Count station click API call to let the click be counted, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/{format}/stations/byuuid/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/byname/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bynameexact/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bycodec/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bycodecexact/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bycountry/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bycountryexact/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bycountrycodeexact/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bystate/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bystateexact/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bylanguage/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bylanguageexact/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bytag/{searchterm}
http://de2.api.radio-browser.info/{format}/stations/bytagexact/{searchterm}
Parameter:
Name	Default value	Possible value	Description
order	name	name, url, homepage, favicon, tags, country, state, language, votes, codec, bitrate, lastcheckok, lastchecktime, clicktimestamp, clickcount, clicktrend, changetimestamp, random	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result JSON:
Details at Struct station
[
  {
    "name": "..",
    ...
  },
  {
    ...
  },
  {
    ...
  },
  ..
]
Result XML:
Details at Struct station
<result>
  <station name=".." ... >
  <station name=".." ... >
  <station name=".." ... >
  ..
</result>
              
Example:
http://de2.api.radio-browser.info/json/stations/byname/jazz
http://de2.api.radio-browser.info/xml/stations/bycountry/austria
http://de2.api.radio-browser.info/xml/stations/bycountryexact/austria
http://de2.api.radio-browser.info/xml/stations/bycountrycodeexact/at
http://de2.api.radio-browser.info/m3u/stations/bytagexact/320kbps
http://de2.api.radio-browser.info/pls/stations/bytagexact/320kbps
List of all radio stations
A list of all radio stations. Please use Count station click API call to let the click be counted, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations
http://de2.api.radio-browser.info/json/stations
Parameter:
Name	Default value	Possible value	Description
order	name	name, url, homepage, favicon, tags, country, state, language, votes, codec, bitrate, lastcheckok, lastchecktime, clicktimestamp, clickcount, clicktrend, changetimestamp, random	name of the attribute the result list will be sorted by
reverse	false	true, false	reverse the result list if set to true
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/xml/stations
http://de2.api.radio-browser.info/json/stations
List of station check results
A list of station check results. If a station UUID is provided, the whole history will be returned. If a station ID is not provided, a list of all last checks of all stations will be sent (without older check results), supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/xml/checks
http://de2.api.radio-browser.info/xml/checks/stationuuid
http://de2.api.radio-browser.info/json/checks
http://de2.api.radio-browser.info/json/checks/stationuuid
Parameter:
Name	Default value	Possible value	Description
stationuuid		UUID	If set, only list check result of the matching station.
lastcheckuuid		UUID	If set, only list checks after the check with the given check.
seconds	0	positive integer values	if >0, it will only return history entries from the last 'seconds' seconds.
limit	999999	0,1,2,....	number of returned datarows (checks)
Result:
Details at Struct station check
Example:
http://de2.api.radio-browser.info/json/checks
http://de2.api.radio-browser.info/xml/checks
List of station clicks
A list of station clicks. If a station UUID is provided, only clicks of the station will be returned. If a station UUID is not provided, a list of all clicks of all stations will be sent (chunksize 10000), supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/xml/clicks
http://de2.api.radio-browser.info/xml/clicks/stationuuid
http://de2.api.radio-browser.info/json/clicks
http://de2.api.radio-browser.info/json/clicks/stationuuid
Parameter:
Name	Default value	Possible value	Description
stationuuid		UUID	If set, only list check result of the matching station.
lastclickuuid		UUID	If set, only list clicks after the click with the given uuid. Use this to continue chunked retrieval to get the next 10000 clicks.
seconds	0	positive integer values	if >0, it will only return history entries from the last 'seconds' seconds.
Result JSON:
          [
          {
            "stationuuid":"963134e8-0601-11e8-ae97-52543be04c81",
            "clickuuid":"ce9ad7bd-34bf-11ea-ac52-52543be04c81",
            "clicktimestamp_iso8601":"2020-01-11T23:14:58Z",
            "clicktimestamp":"2020-01-11 23:14:58"
          },
          {
            "stationuuid":"2a70c205-4850-11e8-b1b0-52543be04c81",
            "clickuuid":"cf49f517-34bf-11ea-ac52-52543be04c81",
            "clicktimestamp_iso8601":"2020-01-11T23:15:00Z"
            "clicktimestamp":"2020-01-11 23:15:00"
          },
          ..
          ]
          
Result XML:
          <click
            stationuuid="961fa288-0601-11e8-ae97-52543be04c81"
            clickuuid="87a69149-34c1-11ea-ac52-52543be04c81"
            clicktimestamp_iso8601="2020-01-11T23:27:18Z"
            clicktimestamp="2020-01-11 23:27:18"
          />
          <click
            stationuuid="7a25bf68-1dbe-11ea-a955-52543be04c81"
            clickuuid="a25e5fb6-34c1-11ea-ac52-52543be04c81"
            clicktimestamp_iso8601="2020-01-11T23:28:03Z"
            clicktimestamp="2020-01-11 23:28:03"
          />
        
Example:
http://de2.api.radio-browser.info/json/clicks
http://de2.api.radio-browser.info/xml/clicks?seconds=3600
List of station check steps
A list of steps that needed to be done to finish a station check.

Supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/xml/checksteps
http://de2.api.radio-browser.info/json/checksteps
Parameter:
Name	Example	Description
uuids	01234567-89ab-cdef-0123-456789abcdef,01234567-89ab-cdef-0123-456789abcdef	MANDATORY, comma-separated list of UUIDs of stations, may be array in JSON
Result JSON:
Array of Struct check step
Result XML:
Details at Struct check step
<result>
  <checkstep stepuuid=".." ... >
  <checkstep stepuuid=".." ... >
  ..
</result>
              
Result CSV:
Details at Struct check step
Example:
http://de2.api.radio-browser.info/json/checksteps
http://de2.api.radio-browser.info/xml/checksteps?uuids=01234567-89ab-cdef-0123-456789abcdef
List of streaming servers
A list of streaming servers that support more detailed information. (e.g.: IceCast)

Supported output formats: JSON, XML

Syntax:
http://de2.api.radio-browser.info/json/streamingservers
http://de2.api.radio-browser.info/xml/streamingservers
Parameter:
Name	Example	Description
hidebroken	true	OPTIONAL, if TRUE, hide servers without added information
Result JSON:
Array of Struct streaming server
Result XML:
Details at Struct streaming server
Example:
http://de2.api.radio-browser.info/json/streamingservers
http://de2.api.radio-browser.info/xml/streamingservers?hidebroken=true
Station click counter
Increase the click count of a station by one. This should be called everytime when a user starts playing a stream to mark the stream more popular than others. Every call to this endpoint from the same IP address and for the same station only gets counted once per day. The call will return detailed information about the stream, supported output formats: JSON, XML ,PLS ,M3U

Syntax:
http://de2.api.radio-browser.info/xml/url/stationuuid
http://de2.api.radio-browser.info/json/url/stationuuid
http://de2.api.radio-browser.info/pls/url/stationuuid
http://de2.api.radio-browser.info/m3u/url/stationuuid
Result JSON:
          {
            "ok": "true",
            "message": "retrieved station url",
            "stationuuid": "9617a958-0601-11e8-ae97-52543be04c81",
            "name": "Station name",
            "url": "http://this.is.an.url"
          }
              
Result XML:
          <result>
            <status ok="true" message="retrieved station url" id="123" name="Station name" url="http://this.is.an.url"/>
          </result>
              
Example:
http://de2.api.radio-browser.info/xml/url/123
http://de2.api.radio-browser.info/json/url/123
http://de2.api.radio-browser.info/pls/url/123
http://de2.api.radio-browser.info/m3u/url/123
Advanced station search
A list of radio stations that match the search. It will search for the station whose attribute contains the search term. Please use Count station click API call to let the click be counted, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/search
http://de2.api.radio-browser.info/json/stations/search
Parameter:
Name	Default value	Possible value	Description
name		STRING	OPTIONAL, name of the station
nameExact	false	true, false	OPTIONAL. True: only exact matches, otherwise all matches.
country		STRING	OPTIONAL, country of the station
countryExact	false	true, false	OPTIONAL. True: only exact matches, otherwise all matches.
countrycode		STRING	OPTIONAL, 2-digit countrycode of the station (see ISO 3166-1 alpha-2).
state		STRING	OPTIONAL, state of the station
stateExact	false	true, false	OPTIONAL. True: only exact matches, otherwise all matches.
language		STRING	OPTIONAL, language of the station
languageExact	false	true, false	OPTIONAL. True: only exact matches, otherwise all matches.
tag		STRING	OPTIONAL, a tag of the station
tagExact	false	true, false	OPTIONAL. True: only exact matches, otherwise all matches.
tagList		STRING, STRING, ...	OPTIONAL. , a comma-separated list of tag. It can also be an array of string in JSON HTTP POST parameters. All tags in list have to match.
codec		STRING	OPTIONAL, codec of the station
bitrateMin	0	POSITIVE INTEGER	OPTIONAL, minimum of kbps for bitrate field of stations in result
bitrateMax	1000000	POSITIVE INTEGER	OPTIONAL, maximum of kbps for bitrate field of stations in result
has_geo_info	both	not set, true, false	OPTIONAL, not set=display all, true=show only stations with geo_info, false=show only stations without geo_info
has_extended_info	both	not set, true, false	OPTIONAL, not set=display all, true=show only stations which do provide extended information, false=show only stations without extended information
is_https	both	not set, true, false	OPTIONAL, not set=display all, true=show only stations which have https url, false=show only stations that do stream unencrypted with http
geo_lat		NUMBER, FLOAT, -90.0<=x<=90.0	OPTIONAL
geo_long		NUMBER, FLOAT, -180.0<=x<=180.0	OPTIONAL
geo_distance		NUMBER, FLOAT, meters >=0	OPTIONAL, does select only stations with distance from (geo_lat,geo_long) that is smaller than geo_distance in meters
order	name	name, url, homepage, favicon, tags, country, state, language, votes, codec, bitrate, lastcheckok, lastchecktime, clicktimestamp, clickcount, clicktrend, changetimestamp, random	OPTIONAL, name of the attribute the result list will be sorted by
reverse	false	true, false	OPTIONAL, reverse the result list if set to true
offset	0	POSITIVE INTEGER	OPTIONAL, starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	OPTIONAL, number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/json/stations/search
Search radio stations by UUID
A list of radio stations that have an exact UUID match, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/byuuid
http://de2.api.radio-browser.info/json/stations/byuuid
Parameter:
Name	Example value	Description
uuids	110e57c5-0601-11e8-ae97-52543be04c81,220e57c5-0601-11e8-ae97-52543be04c81,330e57c5-0601-11e8-ae97-52543be04c81	MANDATORY, comma-separated list of UUIDs
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/json/stations/byuuid
Search radio stations by URL
A list of radio stations that have an exact URL match, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/byurl
http://de2.api.radio-browser.info/json/stations/byurl
Parameter:
Name	Example value	Description
url	http://this.is.a.link/test.mp3	MANDATORY, URL of the station
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/json/stations/byurl
Stations by clicks
A list of the stations that are clicked the most. You can add a parameter with the number of wanted stations, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/topclick
http://de2.api.radio-browser.info/xml/stations/topclick/rowcount
http://de2.api.radio-browser.info/json/stations/topclick
http://de2.api.radio-browser.info/json/stations/topclick/rowcount
Parameter:
Name	Default value	Possible value	Description
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/xml/stations/topclick
http://de2.api.radio-browser.info/json/stations/topclick/5
Stations by votes
A list of the highest-voted stations. You can add a parameter with the number of wanted stations, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/topvote
http://de2.api.radio-browser.info/xml/stations/topvote/rowcount
http://de2.api.radio-browser.info/json/stations/topvote
http://de2.api.radio-browser.info/json/stations/topvote/rowcount
Parameter:
Name	Default value	Possible value	Description
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/xml/stations/topvote
http://de2.api.radio-browser.info/json/stations/topvote/5
http://de2.api.radio-browser.info/m3u/stations/topvote/5
Stations by recent click
A list of stations that were clicked recently, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/lastclick
http://de2.api.radio-browser.info/xml/stations/lastclick/rowcount
http://de2.api.radio-browser.info/json/stations/lastclick
http://de2.api.radio-browser.info/json/stations/lastclick/rowcount
Parameter:
Name	Default value	Possible value	Description
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/xml/stations/lastclick
http://de2.api.radio-browser.info/json/stations/lastclick/5
Stations by recently changed/added
A list of stations that were added or changed recently, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/lastchange
http://de2.api.radio-browser.info/xml/stations/lastchange/rowcount
http://de2.api.radio-browser.info/json/stations/lastchange
http://de2.api.radio-browser.info/json/stations/lastchange/rowcount
Parameter:
Name	Default value	Possible value	Description
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
hidebroken	false	true, false	do list/not list broken stations
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/xml/stations/lastchange
http://de2.api.radio-browser.info/json/stations/lastchange/5
Old versions of stations
A list of old versions of stations from the last 30 days, and you can also retrieve the history of a single station by its ID. They are not visible through any other API calls. Station ID can be an ID or a station UUID, supported output formats: JSON, XML, CSV

Syntax:
http://de2.api.radio-browser.info/json/stations/changed
http://de2.api.radio-browser.info/json/stations/changed/stationuuid
http://de2.api.radio-browser.info/xml/stations/changed
http://de2.api.radio-browser.info/xml/stations/changed/stationuuid
Parameter:
Name	Default value	Possible value	Description
lastchangeuuid		valid uuid	If defined, only show changes that happened after the one with this UUID. Is ignored if uuids is set.
limit	999999	0,1,2,....	number of returned datarows (changes)
Example:
http://de2.api.radio-browser.info/xml/stations/changed?lastchangeuuid=123&limit=10
http://de2.api.radio-browser.info/json/stations/changed/123
Broken stations
A list of the stations that did not pass the connection test, supported output formats: JSON, XML, CSV, M3U, PLS, XSPF, TTL

Syntax:
http://de2.api.radio-browser.info/xml/stations/broken
http://de2.api.radio-browser.info/xml/stations/broken/rowcount
http://de2.api.radio-browser.info/json/stations/broken
http://de2.api.radio-browser.info/json/stations/broken/rowcount
Parameter:
Name	Default value	Possible value	Description
offset	0	0,1,2,3,4,..	starting value of the result list from the database. For example, if you want to do paging on the server side.
limit	100000	0,1,2,....	number of returned datarows (stations) starting with offset
Result:
Array of Struct station

Example:
http://de2.api.radio-browser.info/xml/stations/broken?limit=5
http://de2.api.radio-browser.info/json/stations/broken/5
Vote for station
Increase the vote count for the station by one. Can only be done by the same IP address for one station every 10 minutes. If it works, the changed station will be returned as result, supported output formats: JSON, XML

Syntax:
http://de2.api.radio-browser.info/xml/vote/stationuuid
http://de2.api.radio-browser.info/json/vote/stationuuid
Result JSON:
{
  "ok": true,
  "message": "voted for station successfully"
}
Result XML:
<result>
  <status ok="true" message="voted for station successfully"/>
</result>
Example:
http://de2.api.radio-browser.info/json/vote/123
Add radio station
Add a radio station to the database, supported output formats: JSON, XML

Syntax:
http://de2.api.radio-browser.info/xml/add
http://de2.api.radio-browser.info/json/add
Parameter:
Name	Example value	Description
name	Station Name	MANDATORY, the name of the radio station. Max 400 chars.
url	http://this.is.an.url/stream.mp3	MANDATORY, the URL of the station
homepage	http://this.is.an.url/	the homepage URL of the station
favicon	http://this.is.an.url/favicon.ico	the URL of an image file (jpg or png)
countrycode	AT	The 2 letter countrycode of the country where the radio station is located
state (DEPRECATED)	Vienna	Use iso_3166_2 instead. (The name of the part of the country where the station is located)
iso_3166_2	AT-9	The iso code of the part of the country where the station is located
language	English	The main language used in spoken text parts of the radio station
tags	pop,rock	A list of tags separated by commas to describe the station
geo_lat	12.3456	The latitude of the stream location. Nullable.
geo_long	-12.3456	The longitude of the stream location. Nullable.
Result JSON:
{
  "ok": true,
  "message": "station was added",
  "uuid": "550e8400-e29b-11d4-a716-446655440000"
}
Result XML:
<result>
  <status ok="true"
  message="station was added"
  uuid="550e8400-e29b-11d4-a716-446655440000"
</result>
Example:
http://de2.api.radio-browser.info/json/add
http://de2.api.radio-browser.info/xml/add
Server stats
Web service stats, supported output formats: JSON, XML

Syntax:
http://de2.api.radio-browser.info/xml/stats
http://de2.api.radio-browser.info/json/stats
Result JSON:
{
  "supported_version": 1,
  "software_version": "0.5.0",
  "status": "OK",
  "stations": 4047,
  "stations_broken": 45,
  "tags": 677,
  "clicks_last_hour": 65,
  "clicks_last_day": 1822,
  "languages": 59,
  "countries": 81
}
Result XML:
<result>
  <stats
    status="OK"
    supported_version="1"
    software_version="0.5.0"
    stations="4047"
    stations_broken="45"
    tags="677"
    clicks_last_hour="66"
    clicks_last_day="1824"
    languages="59"
    countries="81"/>
</result>
Example:
http://de2.api.radio-browser.info/xml/stats
Server mirrors
A list of server mirrors. A DNS look-up of all.api.radio-browser.info is performed followed by a reverse one for every result getting from the first request. This should be done on the client. ONLY USE THIS if your client is not able to do DNS look-ups, supported output formats: JSON

Syntax:
http://de2.api.radio-browser.info/json/servers
Result JSON:
[
    {
        "ip": "95.179.139.106",
        "name": "nl1.api.radio-browser.info"
    },
    {
        "ip": "89.58.16.19",
        "name": "at1.api.radio-browser.info"
    },
    {
        "ip": "188.68.62.16",
        "name": "de1.api.radio-browser.info"
    },
    {
        "ip": "2a03:4000:6:8077::1",
        "name": "de1.api.radio-browser.info"
    },
    {
        "ip": "2a0a:4cc0:0:db9:282b:91ff:fed0:ddea",
        "name": "at1.api.radio-browser.info"
    },
    {
        "ip": "2001:19f0:5001:32a4:5400:2ff:fe37:75c2",
        "name": "nl1.api.radio-browser.info"
    }
]
Example:
http://de2.api.radio-browser.info/json/servers
Server config
The current active server config, supported output formats: JSON, XML

Syntax:
http://de2.api.radio-browser.info/json/config
http://de2.api.radio-browser.info/xml/config
Result JSON:
{
    "check_enabled": false,
    "prometheus_exporter_enabled": true,
    "pull_servers": [
        "http://www.radio-browser.info/webservice",
        "http://de1.api.radio-browser.info"
    ],
    "tcp_timeout_seconds": 10,
    "broken_stations_never_working_timeout_seconds": 259200,
    "broken_stations_timeout_seconds": 2592000,
    "checks_timeout_seconds": 2592000,
    "click_valid_timeout_seconds": 86400,
    "clicks_timeout_seconds": 2592000,
    "mirror_pull_interval_seconds": 300,
    "update_caches_interval_seconds": 300,
    "server_name": "gaia",
    "server_location": "Datacenter 2 in coolstreet",
    "server_country_code": "DE",
    "check_retries": 5,
    "check_batchsize": 100,
    "check_pause_seconds": 60,
    "api_threads": 5,
    "cache_type": "redis",
    "cache_ttl": 60

}
        
Result XML:
<config>
  <check_enabled>false</check_enabled>
  <prometheus_exporter_enabled>true</prometheus_exporter_enabled>
  <pull_servers>
    <url>http://www.radio-browser.info/webservice</url>
    <url>http://de1.api.radio-browser.info</url>
  </pull_servers>
  <tcp_timeout_seconds>10</tcp_timeout_seconds>
  <broken_stations_never_working_timeout_seconds>259200</broken_stations_never_working_timeout_seconds>
  <broken_stations_timeout_seconds>2592000</broken_stations_timeout_seconds>
  <checks_timeout_seconds>2592000</checks_timeout_seconds>
  <click_valid_timeout_seconds>86400</click_valid_timeout_seconds>
  <clicks_timeout_seconds>2592000</clicks_timeout_seconds>
  <mirror_pull_interval_seconds>300</mirror_pull_interval_seconds>
  <update_caches_interval_seconds>300</update_caches_interval_seconds>
  <server_name>gaia</server_name>
  <server_location>Datacenter 2 in coolstreet</server_location>
  <server_country_code>DE</server_country_code>
  <check_retries>5</check_retries>
  <check_batchsize>100</check_batchsize>
  <check_pause_seconds>60</check_pause_seconds>
  <api_threads>5</api_threads>
  <cache_type>redis</cache_type>
  <cache_ttl>60</cache_ttl>
</config>
        
Example:
http://de2.api.radio-browser.info/json/config
http://de2.api.radio-browser.info/xml/config
Prometheus monitoring
Exporter for prometheus. It renders internal data about the server in a specific format that is readable by the time series database prometheus.

Syntax:
http://de2.api.radio-browser.info/metrics
Result:
# HELP radio_browser_clicks_last_hour Clicks in the last hour
# TYPE radio_browser_clicks_last_hour gauge
radio_browser_clicks_last_hour 0

# HELP radio_browser_stations_broken Count of stations that are broken
# TYPE radio_browser_stations_broken gauge
radio_browser_stations_broken 740

# HELP radio_browser_stations_working Count of stations that are working/usable
# TYPE radio_browser_stations_working gauge
radio_browser_stations_working 26514

# HELP radio_browser_stations_todo Count of stations that need are in the queue for checking
# TYPE radio_browser_stations_todo gauge
radio_browser_stations_todo 27254

# HELP radio_browser_stations_deletable_never_worked Count of stations that are in the list for deletion and which never worked
# TYPE radio_browser_stations_deletable_never_worked gauge
radio_browser_stations_deletable_never_worked 0

# HELP radio_browser_stations_deletable_were_working Count of stations that are in the list for deletion and which worked at some point
# TYPE radio_browser_stations_deletable_were_working gauge
radio_browser_stations_deletable_were_working 0
Example:
http://de2.api.radio-browser.info/metrics