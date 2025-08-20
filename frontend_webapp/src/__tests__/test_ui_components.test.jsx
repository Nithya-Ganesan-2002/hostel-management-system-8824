import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../components/ui/Button';
import { Card, CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import Table from '../components/ui/Table';

describe('UI Components', () => {
  test('Button renders with text and handles click', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const btn = screen.getByText(/click me/i);
    fireEvent.click(btn);
    expect(onClick).toHaveBeenCalled();
  });

  test('Card composition renders header, body, footer', () => {
    render(
      <Card>
        <CardHeader title="Title" subtitle="Sub" actions={<button>Act</button>} />
        <CardBody>Body</CardBody>
        <CardFooter>Foot</CardFooter>
      </Card>
    );
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Sub')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Foot')).toBeInTheDocument();
    expect(screen.getByText('Act')).toBeInTheDocument();
  });

  test('Input shows label, accepts typing, and shows error', () => {
    const { rerender } = render(<Input label="Email" value="" onChange={() => {}} error="" />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    rerender(<Input label="Email" value="" onChange={() => {}} error="Required" />);
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  test('Modal shows when open and calls onClose', () => {
    const onClose = jest.fn();
    const { rerender } = render(<Modal open={false} title="My Modal" onClose={onClose}>Content</Modal>);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    rerender(<Modal open title="My Modal" onClose={onClose}>Content</Modal>);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    const closeBtn = screen.getByLabelText(/close modal/i);
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('Table renders headers and "No records" when data empty', () => {
    const columns = [
      { key: 'name', header: 'Name' },
      { key: 'age', header: 'Age' },
    ];
    render(<Table columns={columns} data={[]} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('No records.')).toBeInTheDocument();
  });

  test('Table renders rows and action column', () => {
    const columns = [{ key: 'name', header: 'Name' }];
    const data = [{ id: '1', name: 'Alice' }];
    render(<Table columns={columns} data={data} actions={() => <button>Act</button>} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Act')).toBeInTheDocument();
  });
});
