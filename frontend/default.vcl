backend default {
    .host = "api";
    .port = "3000";
}

sub vcl_recv {
    if (req.request != "GET" && req.request != "HEAD") {
        /* We only deal with GET and HEAD */
        return (error);
    }

    unset req.http.Cookie;
    unset req.http.Cache-Control;
}

sub vcl_deliver {
  unset resp.http.Via;
  unset resp.http.X-Varnish;

  if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
  } else {
    set resp.http.X-Cache = "MISS";
  }
}

sub vcl_error {
     set obj.http.Content-Type = "application/json; charset=utf-8";
     set obj.http.Retry-After = "5";
     synthetic {"
        {
            "error": "Splat"
        }
    "};
    return (deliver);
}
