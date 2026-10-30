@extends('layouts.app')

@section('content')
<div>
<div class="mens_header_bg"><h3>Emart Products</h3></div><div class="mens_content"><div class="container"><div class="row"><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/emart/1.jpg') }}" alt="emarts"></a></div></div></div><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/emart/2.jpg') }}" alt="emarts"></a></div></div></div><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/emart/3.jpg') }}" alt="emarts"></a></div></div></div><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/emart/4.jpg') }}" alt="emarts"></a></div></div></div></div></div></div></div>
</div>
@endsection
