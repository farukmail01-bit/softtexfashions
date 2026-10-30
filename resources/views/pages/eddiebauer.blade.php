@extends('layouts.app')

@section('content')
<div>
<div class="mens_header_bg"><h3>Eddie Bauer Products</h3></div><div class="mens_content"><div class="container"><div class="row"><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/eddiebauer/1.jpg') }}" alt="eddiebauers"></a></div></div></div><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/eddiebauer/2.jpg') }}" alt="eddiebauers"></a></div></div></div><div class="col-md-3 col-6"><div class="card my-3"><div class="card-body"><a class="gallery_img"><img class="img-fluid" src="{{ asset('images/eddiebauer/3.jpg') }}" alt="eddiebauers"></a></div></div></div></div></div></div></div>
</div>
@endsection
