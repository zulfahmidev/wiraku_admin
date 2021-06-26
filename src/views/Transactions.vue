<template>
    <div class="inner">
        <h2>Transactions</h2>
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item active" aria-current="page">Transactions</li>
                <li class="breadcrumb-item" aria-current="page"></li>
            </ol>
        </nav>
        <ul class="nav nav-pills categories">
            <li class="nav-item active">
                <a href="" class="nav-link">All</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Panding</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link">Confirmed</a>
            </li>
        </ul>
        <div class="wf-container mt-4">
            <table id="transactions_table" class="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Gmail</th>
                        <th>Course</th>
                        <th>Price</th>
                        <th>Order At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Zulfahmi</td>
                        <td>zulfahmineo@gmail.com</td>
                        <td>Belajar Giat</td>
                        <td>Rp 300,000</td>
                        <td>11 Juni 2021</td>
                        <td>
                            <a href="" class="btn btn-success btn-sm"><i class="fa fa-check"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Zulfahmi</td>
                        <td>zulfahmineo@gmail.com</td>
                        <td>Belajar Giat</td>
                        <td>Rp 300,000</td>
                        <td>11 Juni 2021</td>
                        <td>
                            <a href="" class="btn btn-success btn-sm"><i class="fa fa-check"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Zulfahmi</td>
                        <td>zulfahmineo@gmail.com</td>
                        <td>Belajar Giat</td>
                        <td>Rp 300,000</td>
                        <td>11 Juni 2021</td>
                        <td>
                            <a href="" class="btn btn-dark btn-sm"><i class="far fa-clock"></i></a>
                        </td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Zulfahmi</td>
                        <td>zulfahmineo@gmail.com</td>
                        <td>Belajar Giat</td>
                        <td>Rp 300,000</td>
                        <td>11 Juni 2021</td>
                        <td>
                            <a href="" class="btn btn-success btn-sm"><i class="fa fa-check"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>