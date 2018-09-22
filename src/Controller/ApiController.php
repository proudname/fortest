<?php

namespace App\Controller;

use App\Entity\Order;
use App\Form\OrderType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{

//    Апи, которое обрабатывает обращения через ajax

    /**
     * @Route("/api/list", name="list")
     */
    public function list()
    {
        $db = $this->getDoctrine()->getManager()->getRepository(Order::class);
        if ($orders = $db->findAll()) {
            return $this->json([
                'response' => 1,
                'orders' => $orders
            ]);
        }

        return $this->json([
            'response' => 0,
            'message' => 'Ничего не найдено'
        ]);
    }

    /**
     * @Route("/api/add", name="add")
     */
    public function add(Request $request)
    {
        $order = new Order();
        $form = $this->createForm(OrderType::class, $order, ['csrf_protection' => false]);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $db = $this->getDoctrine()->getManager();
            if (preg_match('/^[\w\d-]{0,20}@.[\w\d-]{0,20}\.[\w]{2,3}$/ui', $order->getEmail())) {
                $db->persist($order);
                $db->flush();

                return $this->json([
                    'response' => 1,
                    'added' => 1
                ]);
            }

            return $this->json([
                'response' => 1,
                'added' => 0,
                'form' => $this->render('partial/form.html.twig', ['form' => $form->createView()]),
                'errors' => 'Электронная почта указана в неверном формате.'
            ]);

        }


        return $this->json([
            'response' => 1,
            'added' => 0,
            'form' => $this->render('partial/form.html.twig', ['form' => $form->createView()]),
            'errors' => $form->getErrors()
        ]);
    }

    /**
     * @Route("/api/remove/{id}", name="remove")
     */
    public function remove($id)
    {
        $db = $this->getDoctrine()->getManager();
        if ($order = $db->getRepository(Order::class)->find($id)) {

            $db->remove($order);
            $db->flush();
            return $this->json([
                'response' => 1,
                'message' => 'Удалено'
            ]);
        }

        return $this->json([
            'response' => 0,
            'message' => 'Объект не найден'
        ]);
    }

    /**
     * @Route("/api/show/{id}", name="show")
     */
    public function show($id)
    {
        $db = $this->getDoctrine()->getManager();
        if ($order = $db->getRepository(Order::class)->find($id)) {
            return $this->json([
                'response' => 1,
                'order' => $order
            ]);
        }

        return $this->json([
            'response' => 0,
            'message' => 'Объект не найден'
        ]);
    }

    /**
     * @Route("/api/update/{id}", name="update")
     */
    public function update(Request $request, $id)
    {
        $db = $this->getDoctrine()->getManager();
        $order = $db->getRepository(Order::class)->find($id);
        $form = $this->createForm(OrderType::class, $order, ['csrf_protection' => false]);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {

            if (preg_match('/^[\w\d-]{0,20}@.[\w\d-]{0,20}\.[\w]{2,3}$/ui', $order->getEmail())) {
                $db->persist($order);
                $db->flush();

                return $this->json([
                    'response' => 1,
                    'updated' => 1
                ]);
            }

            return $this->json([
                'response' => 1,
                'updated' => 0,
                'form' => $this->render('partial/form.html.twig', ['form' => $form->createView()]),
                'errors' => 'Электронная почта указана в неверном формате.'
            ]);

        }
        return $this->json([
            'response' => 1,
            'updated' => 0,
            'form' => $this->render('partial/form.html.twig', ['form' => $form->createView()]),
            'errors' => $form->getErrors()
        ]);
    }
}
